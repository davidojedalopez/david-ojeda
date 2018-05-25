---
layout: post
title: Issuing Requests from Docker Container Running on Jenkins
ref: issuing-request-from-docker-conatiner-running-on-jenkins
lang: en
date: 2018-05-25
comments: true
categories: [Docker, Jenkins, iptables]
published: false
---

This post is about a specific problem I encountered where I couldn't make any requests from my Docker container to the outside world. It was my first time working with Jenkins Pipelines and decided to use Docker as my isolation agent. 

Some things to know that relate to the problem:
- Jenkins is running on Tomcat, not on a Docker container
- I have port redirection (80 -> 8080 & 443 -> 8443) using iptables

## How to reproduce it?

The relevant part of my Jenkinsfile is this:

```groovy
stage('build and test apps') {
  failFast true
  parallel {
    stage('front end') {
      steps {
        sh 'npm install --prefix front_end/'
        sh 'npm run build --prefix front_end/'
        sh 'npm run test --prefix front_end/'
      }
    }

    stage('back end') {
      steps {
        sh 'npm install --prefix back_end/'
        sh 'npm run test --prefix back_end/'
      }
    }
  }
}
```

The requests needed on the `npm install` command were failing with 403 http errors and this log was appearing:

```
npm ERR! Unexpected token < in JSON at position 0
npm ERR! <html><head><meta http-equiv='refresh' content='1;url=/login?from=%2Freact-scripts'/><script>window.location.replace('/login?from=%2Freact-scripts');</script></head><body style='background-color:white; color:white;'>
npm ERR! 
npm ERR! 
npm ERR! Authentication required
npm ERR! <!--
npm ERR! You are authenticated as: anonymous
npm ERR! Groups that you are in:
npm ERR!   
npm ERR! Permission you need to have (but didn't): hudson.model.Hudson.Read
npm ERR!  ... which is implied by: hudson.security.Permission.GenericRead
npm ERR!  ... which is implied by: hudson.model.Hudson.Administer
npm ERR! -->
npm ERR! 
npm ERR! </body></html>                                                                                                                                                                                                                                                                                                            
npm ERR! 
npm ERR! If you need help, you may report this error at:
npm ERR!     <https://github.com/npm/npm/issues>
```

After reading the logs, the first thing I thought was: this is something related to permissions of the user running the Docker container- *tomcat* in my case -but they weren't. 

After debugging for quite a while, I stumbled upon [some divine light on StackOverflow](https://stackoverflow.com/questions/44264082/why-is-jenkins-on-the-docker-host-responding-to-http-requests-from-inside-contai). Thanks to this, I found that I was redirecting **all** port 80 and 443 trafic from **everywhere** to their corresponding 8080 and 8443 ports. 

## The solution

**Alter the iptables to create a negated rule and avoid redirects from the Docker subnet**. You can see the example shown in the StackOverflow's question. 

While doing this, I also needed to learn some more about iptables and the different options. So I hope you find [this quick guide from **linode**](https://www.linode.com/docs/security/firewalls/control-network-traffic-with-iptables/) handy. 