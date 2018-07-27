---
layout: post
title: Road to AWS Certification - IAM Pt. 1
ref: road-to-aws-certification-iam-pt1
lang: en
date: 2018-07-25
comments: true
categories: [aws, iam]
published: false
---

*Part one of this series covers IAM basics and a general use case.*

*Part two is the implementation of the use case in part 1, that is, the creation of users, groups and policies to restrict access to some AWS services.*

---

# What's IAM?
AWS **I**dentity and **A**ccess **M**anagement, called **IAM**, is a feature of AWS that allows you to have fine-grained control over whom can access any of your AWS resources and to what extent. Also, it's **free**.

# What can it do?
It can **allow and restrict access** to specific services and actions to specific users or roles- more on this below.

# Why use it?
You don't want every user to be able to do absolutely everything on your account. Usually you want a set of users- or group of users- to execute a set of specific actions on selected services. **That's why you need IAM.**

# Some basic IAM concepts
Once you start using IAM you're going to stumble upon some of these concepts and you need to understand them very well to know when to use one or the other.

- ## Users
  You can think of IAM users as **physical individuals** that need some level of access to your AWS resources either throught the console and/or programatically.
  **User access AWS resource**.

- ## Groups
  Groups are no more than a collection of users that share the same restrictions. Using groups helps you re-use your "restrictions rules".
  **Users form a group**.

- ## Roles
  Roles are somehow similar to users, except for the fact that roles are used to restrict access from resource to resource.
  **Resource access resource**.

- ## Policies
  **Policies are the cornerstone of IAM**. They are the set of rules and restrictions to services and actions that are assigned to users, groups and roles.

We're not yet gonna dive on how to create any of these entities. First, let me show you a common situation where IAM can greatly help you.

Let's suppose you're the CTO of a company with three developers, one salesperson, and one accountant. The developers have different roles on your company: one is a DevOps engineer, another a web developer, and the last one a mobile developer.

You all use AWS, but each needs a different set of services. You don't want every employee to have acccess to every resource, so you decide to use IAM to solve this problem.

# How you solve this?
With IAM, you create a **group** called *"Developers"* and attach a **policy** for all of them to have access to S3, since there's where you store many configuration files, build packages, and other files you all three need.

Now, those were the shared restrictions, that's why they are in a group. You want now to create each **user** so you can extend each individual access to more services.

Let's define what do each of these users need:

- **DevOps developer**: Console and programmatic access to ElasticBeanstalk, EC2, among other services.
- **Web developer**: Console and programmatic access to ElasticBeanstalk.
- **Mobile developer**: Programmatic access to AWS mobile services such as Cognito.

With these specifications in mind, we can proceed now to create each user and assign, or not, console and programmatic access to AWS. From there, you will create a specific **policy** for each user stating what they can and can't do.

These new users will all be added to the *Developers* group, so each of them will have full S3 access, and their specific developer needs will be also covered.

What about the sales person and accountant? The sales person doesn't need AWS access at the moment, so no user for him 🙃 Your accountant does need to access an S3 bucket where the AWS billing is stored every month though. For this person you want to create a single user with only console access and with only read permissions to a specific bucket on your AWS account.

And that's an overview on how IAM can help you manage and control access to your AWS resources. I know this post is very general and doesn't dive deep into how you **actually** achieve this. That's why we're now going to implement this solution on the next blog post!


(LINK TO NEXT BLOG POST)

**Thanks for reading me!**