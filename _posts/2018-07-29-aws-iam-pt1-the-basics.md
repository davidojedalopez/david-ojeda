---
layout: post
title: AWS IAM Pt. 1 - The Basics
ref: aws-iam-pt1-the-basics
lang: en
date: 2018-07-29
comments: true
categories: [aws, iam]
---

*Part one of this series covers IAM basics and a general use case.*

*[Part two]({{ site.baseurl }}{% post_url 2018-07-29-aws-iam-pt2-a-practical-example %}) is the implementation of the use case in part one, that is, the creation of users, groups and policies to restrict access to some AWS services.*

---
---

# What's IAM? 🔑
AWS **I**dentity and **A**ccess **M**anagement, called **IAM**, is a feature of AWS that allows you to have fine-grained control over whom can access any of your AWS resources and to what extent. Also, it's **free**.

# What can it do?
It can **allow and restrict access** to specific services and actions to specific users or roles- more on this below.

# Why use it?
You don't want every user to be able to do absolutely everything on your account. Usually you want a set of users- or group of users- to execute a set of specific actions on selected services. **That's why you need IAM**.

# Some basic IAM concepts
Once you start using IAM you're going to stumble upon some of these concepts and you need to understand them very well to know when to use one or the other.

- ## Policies
  **Policies are the cornerstone of IAM**. They are the set of rules and restrictions that define the level of access to services and actions to your AWS resources.

- ## Users
  You can think of IAM users as **physical individuals** that need some level of access to your AWS resources either throught the console and/or programatically. E.g.: John needs check if the servers are healthy- **he needs EC2 access**.

- ## Groups
  Groups are no more than a collection of users that share the same restrictions. Using groups helps you re-use your policies. E.g.: Your networking team need to do a security audit on your network settings- **they all need VPC access**.

- ## Roles
  Roles are somehow similar to users, except for the fact that roles are used to restrict access from resource to resource. E.g.: Your server needs to notify a queue of an event- **your EC2 servers need SQS access**.

We're not yet gonna dive on how to create any of these entities. First, let me show you a common situation where IAM can greatly help you.

Let's suppose you're the CTO of a company with:
- Four developers- Sally, Maria, John and Jane
- One salesperson- Peter
- One accountant- Mary

The developers have different roles on your company: Sally is a DevOps engineer, John and Maria are web developers, and Jane's a mobile developer.

You all use AWS, but each needs a different set of services. You don't want every employee to have acccess to every resource, so you decide to use IAM to solve this problem.

# But how?
With IAM, you create a **group** for each job role and attach a **policy** for the specific access needed. Then you add users to the adequate group.

Let's define what do each of these groups need:

- **DevOps developers**: Console and programmatic access to ElasticBeanstalk, EC2, S3 ans SQS
- **Web developers**: Console and programmatic access to ElasticBeanstalk and S3
- **Mobile developers**: Programmatic access to S3 and AWS mobile services such as Cognito

With these specifications in mind, we can proceed now to create each group and user and assign, or not, console and programmatic access to AWS as well as the needed policies.

What about the sales person and accountant? The sales person doesn't need AWS access at the moment, so no user for him 🙃 Your accountant does need to access an S3 bucket where the AWS billing is stored every month though. For this person you want to create a single user with only console access and with only read permissions to a specific bucket on your AWS account.

And that's an overview on how IAM can help you manage and control access to your AWS resources. I know this post is very general and doesn't dive deep into how you *actually* achieve this. That's why we're now going to implement this solution [on the next blog post!]({{ site.baseurl }}{% post_url 2018-07-29-aws-iam-pt2-a-practical-example %})


**Thanks for reading me!** ❤️

---

*[S3]: Simple Storage Service - AWS storage solution
*[EC2]: Elastic Compute Cloud - AWS computational cloud solution
*[ElasticBeanstalk]: AWS-managed computational cloud solution
*[SQS]: Simple Queue Service - AWS queue solution
*[VPC]: Virtual Private Cloud - AWS network management solution
*[Cognito]: AWS solution for mobile sign-in and sign-up
*[IAM]: Identity Access Management - Permissions within AWS