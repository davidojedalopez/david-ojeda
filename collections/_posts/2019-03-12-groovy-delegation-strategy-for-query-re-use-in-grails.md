---
layout: post
title: Groovy delegation strategy for query re-use in Grails
ref: groovy-delegation-strategy
lang: en
date: 2019-3-12
comments: true
published: true
categories: [groovy, grails, hibernate]
---

## The problem

Many of our web app *views*/pages, among other features, consist of a list of entries from a database table. For example, you can go to */customer/list* and get a list and count of your customers. This is fairly common for MVC apps like ours.

What we've found is that we end up repeating a lot of code when getting those queries from the database since many of our Domains/tables are filtered by the same fields- current status of the entry (enabled or disabled), belongs to a certain company, user permissions allow him/her to see it, etc.

So we would end up with something like this to get the information for those *list* views:

```groovy
    class Customer {
        Company company
    	boolean enabled
    }      

    def customerList(def params) {
        Customer.createCriteria().list {
            eq 'enabled', params.boolean('enabled')
            eq 'company',  params.company
            maxResults params.int('max', 10)
        }
    }
    
    def customerCount(def params){
        Customer.createCriteria().get {
            eq 'enabled', params.boolean('enabled')
            eq 'company', params.company
            projections {
                countDistinct 'id'
            }
        }
    }
```

```groovy
    class User {
    	Company company
    	boolean enabled
    }
    
    def userList(def params) {
        User.createCriteria().list {
            eq 'enabled', params.boolean('enabled')
            eq 'company', params.company
            maxResults params.int('max', 10)
        }
    }
    
    def userCount(def params){
        User.createCriteria().get {
            eq 'enabled', params.boolean('enabled')
            eq 'company', params.company
            projections {
                countDistinct 'id'
            }
        }
    }
```

**The body of both list and count methods are almost the same**, the only difference is the table or Domain to which the query goes.

So we're looking for a way to refactor this code in order to avoid repeating ourselves.


## The solution

We will use a **Groovy closure delegate** to avoid repeating these type of queries. More specifically, we will use something called Closure Delegation Strategy to achieve it. Let's get to it!


## Background theory

### Groovy Closures

Closures by themselves deserve a dedicated blog post, but I find Groovy docs to be really clear and to the point. If you haven't worked with closures before or you are looking for a deeper understanding, [please take a look at the docs](http://groovy-lang.org/closures.html#_delegation_strategy).

Right now I will only- briefly -explain some closure concepts.

A Groovy closure looks like this:

```groovy
    def myClosure = { "This is a closure" }
```

and you can call it like this:

```groovy
    assert myClosure() == "This is a closure"
```

A Groovy closure defines three main components:

- **this:** The *class* where the closure is defined
- **owner:** The *enclosing object* where the closure is defined, could be a class or another closure. The difference with **this**: it will return the **direct** enclosing object. If the closure is defined in an inner class, it will return that class, while **this** will return the top-level class.
- **delegate:** Is a third party object where methods calls or properties are resolved whenever the receiver of the message is not defined

It's hard to fully understand these concepts without prior experience with them, so here I provide a Groovy snippet where you can play and move things around to fully grasp the closure components. 

The run() method includes some comments to clarify what's going on. You can [copy-paste it here to try it out](https://groovy-playground.appspot.com/)! 

```groovy
    class OuterClass {
    
        String name = 'outer class'
    
        static void main(String[] args) {}
    
        class InnerClass {
            
            String name = 'inner class'
            
            def ownerClosure = { owner }
            def thisClosure = { this }
            def delegateClosure = { delegate }
            
            def shoutMyName = {
                name.toUpperCase()
            }
        }
    
        def nestedThisClosure = {
            def closure = { this }
            closure()
        }
    
        def nestedOwnerClosure = {
            def closure = { owner }
            closure()
        }
    
        void run() {
            def inner = new InnerClass()
    
            // Here, **this** and **owner** are equal, that is, the enclosing class (InnerClass)
            assert inner.thisClosure() == inner
            assert inner.ownerClosure() == inner
    
            // Here, **this** is the enclosing class (OuterClass) and **owner** is the enclosing closure (nestedOwnerClosure)
            assert nestedThisClosure() == this
            assert nestedOwnerClosure() == nestedOwnerClosure
            
            // The **delegate**, by default, is set to the **owner**
            assert inner.delegateClosure() == inner.ownerClosure()
            assert inner.shoutMyName() == 'INNER CLASS'
            
            // And even though we can change the **delegate**
            inner.shoutMyName.delegate = this
            
            // We are still getting our InnerClass name, why?
            assert inner.shoutMyName() == 'INNER CLASS'
    
            // The default **resolveStrategy** for closures is **OWNER_FIRST**,
            // that means that the name field of the **owner** is resolved first.
            // Luckily, we can also change the **resolveStrategy** of the closure
            inner.shoutMyName.resolveStrategy = Closure.DELEGATE_FIRST
            assert inner.shoutMyName() == 'OUTER CLASS'
    
        }
    }
    
    new OuterClass().run()
```

Now that we have more knowledge of the power of closures, we can implement our delegation strategy to re-use our queries.

## The implementation

As mentioned at the beginning, we have two very similar Domains with similar fields and we need to get both a list and count of those Domains at some point.

To solve this, we're going to **create a closure** to get the list and another closure for the count. Then, **we're changing the closure's delegate** according to the Domain we are querying.

Let's suppose we have a ListService where we're going to manage all this logic.

Here are the closures:

```groovy
    class ListService {
    
    	private def getList = { def params ->
    	    createCriteria().list {
    	        eq 'company', params.company
    	        if(!params.boolean('showDisabled', false)) {
    	            eq 'enabled', true
    	        }
                maxResults params.int('max', 10)
    	    }
    	}
    	
    	private def getCount = { def params ->
    	    createCriteria().get {
    	        eq 'company', params.company
    	        if(!params.boolean('showDisabled', false)) {
    	            eq 'enabled', true
    	        }
    	        projections {
    	            countDistinct 'id'
    	        }
    	    }
    	}
    
    }
```

Now, we need to change the delegate of the closures dynamically, depending on the Domain to query:

```groovy
    class ListService {
    
    	[...]
    
    	def getDomainList(def params, def domain) {
    	    getList.delegate = domain
    	    getList(params)
    	}
    	
    	def getDomainCount(def params, def domain) {
    	    getCount.delegate = domain
    	    getCount(params)
    	}
    
    }
```

Finally, we're going to use this service from our controller to return the values to our list view:

```groovy
    class CustomerController {
    
    	def listService
    
    	def list() {
    		[
    			list: listService.getDomainList(params, Customer),
    			count: listService.getDomainCount(params, Customer)
    		]
    	}
    
    }
```
    
```groovy
    class UserController {
    
    	def listService
    
    	def list() {
    		[
    			list: listService.getDomainList(params, User),
    			count: listService.getDomainCount(params, User)
    		]
    	}
    
    }
```

The list view now has everything it needs to render each result and paginate it!


## Summary

The final flow is this:

1. A request comes to controller, e.g. UserController to get user's list
2. Controller **uses ListService** to query the database. It forwards the params from the request and **specifies the Domain** to query
3. ListService users the given Domain to **change the closure's delegate** and proceeds to execute the closure
4. Closure sees the createCriteria() method call and seeks for the object that implements it. Since we didn't change the closure's resolve strategy, **it will look on the owner first**. 
The owner, our ListService, doesn't implement a createCriteria() method, so the closure **now looks at the delegate**. 
The **delegate is our Domain**, and it has a createCriteria method, so it uses it and returns our results all the way back to our controller.


Now we have two closures that are being used by multiple Domains to get similar data from the database. 

---

<br>

This is only one of many powerful use cases of closure delegates in Groovy. Have you used this feature before? If so, let me know in the comments!



**Thanks for reading me ❤️**