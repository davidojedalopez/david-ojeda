---
layout: post
title: Road to AWS Certification - IAM Pt. 2
ref: road-to-aws-certification-iam-pt2
lang: en
date: 2018-07-26
comments: true
categories: [aws, iam]
published: false
---

*Part one of this series covers IAM basics and a general use case.*

*Part two is the implementation of the use case in part 1, that is, the creation of users, groups and policies to restrict access to some AWS services.*

---

On previous post I explained the basics of AMI and described an use case for it. Now, we're going to implement the actual solution for that problem.

As a quick recap, we have three developers that need shared and not shared access to AWS services, and an accountant that has very limited access. Specifically:
- **DevOps developer**: Console and programmatic access to ElasticBeanstalk, EC2, among other services.
- **Web developer**: Console and programmatic access to ElasticBeanstalk.
- **Mobile developer**: Programmatic access to AWS mobile services such as Cognito.
- **Accountant**: S3 read-only access to the AWS billing reports bucket.

# Let's get started

---

## Create a group
First thing we need is to create a group.
1. Go the IAM console and select the groups section on the sidebar
2. Press the "**Create New Group"** button

![][iam-dashboard-group-creation]

### Name your group
As we said on Part one, our group is going to be called *Developers*:

![][iam-dashboard-group-name]

### Attach a policy.
This is where it starts to get interesting. Remember that a policy is the set of "rules" that will dictate which services and actions are allowed- for the group in this case.

On the next screen you will get a seemingly endless list of already created policies. These policies are managed by AWS, that is, they already contain rules for specific permissions you may need. Luckily for us, there is a policy that perfectly fits our needs:

![][iam-policy-list]

Selecting this policy you are saying: *All users in this group will have full access to S3 and all its actions and buckets.* Go for it.

**NOTE**: You can proceed to the next step without attaching any policy. That means that the group will have no permissions at all.

### Review group
Last step is a review to make sure the name and policies are the ones we intended to set. So, make sure the name and policy are the right ones 😛

---

## Create users


(LINK TO NEXT BLOG POST)

**Thanks for reading me!**



[iam-dashboard-group-creation]: /assets/iam/pt2/pt2-1.png "IAM Dashboard with group section selected"

[iam-dashboard-group-name]: /assets/iam/pt2/pt2-2.png "IAM Group creation - Group name"

[iam-policy-list]: /assets/iam/pt2/pt2-3.png "IAM Policies list - S3 full access policy marked"