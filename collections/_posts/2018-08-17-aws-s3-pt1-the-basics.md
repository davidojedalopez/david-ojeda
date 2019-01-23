---
layout: post
title: AWS S3 Pt. 1 - The Basics
ref: aws-s3-pt1-the-basics
lang: en
date: 2018-08-17
comments: true
categories: [aws, s3]
---

*Part one of this series covers S3 basics and a general use case.*

---


---

<br>

# What's AWS S3?
AWS **S**imple **S**torage **S**ervice, called **S3**, is an object storage solution to reliably store and retrieve any amount of data.

# What can it do?
It can store your files, build packages, reports, images, and any type of data you can think about for later retrieval with a guaranteed 99.999999999% durability. Also, it can restrict access to specific data with very flexible rules.

# Why use it?
S3 is extremely reliable and flexible. You want to use it if you at some point need to store and retrieve:
- Huge amounts of data for analytics
- Files for customers to access
- Build files for your applications
- Assets such as images and videos

Also, it has tons of integrations with other services within AWS.

# Some basic S3 concepts
- ## Buckets
  A Bucket is like a top level directory in Linux in the sense that it is a node in level one. A bucket is then the "directory" that stores a group of objects or more directories (with no quotes since these are proper directories now). More clarification below.

- ## Objects
  Objects are the files itself. A bucket can contain many different objects.

Bucket and objects example:

![S3 URL explained](https://thepracticaldev.s3.amazonaws.com/i/wx0mkto03h9zi2vescrv.png)

- ## Bucket Policies
  S3 bucket policies are the set of rules that explicitly define who has or not access to your bucket and to objects within that bucket.

- ## ACLs
  **A**ccess **C**ontrol **L**ists is yet another way to define access to your buckets and objects. However, this is a legacy access control mechanism, so it's best to focus on bucket policies. The cases in which ACLs are needed are, for example, when a bucket policy grows too large- they are limited to 20 kb in size. Or when you want to restrict access to specific objects within a bucket.

- ## Lifecycle Rules
  Lifecycle rules are actions that S3 can apply to a group of objects depending on how much time they have been stored. For instance, you can delete objects that have been on your buckets for more than 90 days.

Apart from these concepts, one of the most important things to know about S3 is its **consistency model**.

The consistency model of S3 is called **Read-after-Write consistency**. For example, if you issue a PUT request to create an object on a bucket, the next GET request will **ALWAYS** have the desired object.

However, if you try to issue a GET first (object being non-existent), then a PUT and then another GET, you *MIGHT* not found the desired object. Issuing the request in this order, the consistency model is now called eventual consistency.

In other words:

Read-after-Write consistency:
- PUT /my-bucket/photo.png -> 200
- GET /my-bucket/photo.png -> 200

Eventual consistency:
- GET /my-bucket/photo.png -> 404
- PUT /my-bucket/photo.png -> 200
- GET /my-bucket/photo.png -> 404

You also get eventual consistency when you delete an existing object. That is, you *MIGHT* see an object listed on your bucket even though you already deleted it a couple of seconds ago.

This is because changes made to your S3 buckets need some time to propagate and replicate through AWS servers.

# Some S3 use cases

- Store AWS Load Balancer logs for further analysis
- Host static websites
- Store assets for a static web page
- Store exported data for your customers

# Wrap up

This covers the very basics of S3 which are enough to get started with the service. S3 is one of the most used services of AWS due to its reliability, durability and integration with many other services inside and outside AWS.


**Thanks for reading me!** ❤️

---