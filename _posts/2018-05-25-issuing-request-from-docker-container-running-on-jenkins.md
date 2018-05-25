---
layout: post
title: Issuing Requests from Docker Container Running on Jenkins
ref: issuing-request-from-docker-conatiner-running-on-jenkins
lang: en
date: 2018-05-25
comments: true
categories: [Docker, Jenkins, iptables]
published: true
---

This post is about a specific problem I encountered where I **couldn't make any requests from my Docker container to the outside world**. It was my first time working with Jenkins Pipelines and decided to use Docker as my isolation agent.

Some facts related to my environment:
- Jenkins is running on Tomcat, not on a Docker container
- I have port redirection (80 to 8080 and 443 to 8443) using **iptables**

## Code in question

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

## The logs

The requests needed on the `npm install` command were **failing with 403 http errors** and this log was appearing:

```text
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

After reading the logs, the first thing I thought was: this is something related to permissions of the user running the Docker container- **tomcat** in my case -but they weren't.

After debugging for quite a while, I stumbled upon <a href="https://stackoverflow.com/questions/44264082/why-is-jenkins-on-the-docker-host-responding-to-http-requests-from-inside-contai" target="_blank">some divine light on StackOverflow</a>. Thanks to this, I found that I was redirecting **all** port 80 and 443 trafic from **everywhere** to their corresponding 8080 and 8443 ports.

## The solution

**Alter the iptables to create a negated rule and avoid redirects from the Docker subnet**.

First, check your current iptables with this command: ```iptables -t nat -L -n --line-numbers```

```
Chain PREROUTING (policy ACCEPT)
num  target     prot opt source               destination
1    REDIRECT   tcp  --  0.0.0.0/0            0.0.0.0/0            tcp dpt:80 redir ports 8080
2    REDIRECT   tcp  --  0.0.0.0/0            0.0.0.0/0            tcp dpt:443 redir ports 8443
3               tcp  --  0.0.0.0/0            0.0.0.0/0
4    DOCKER     all  --  0.0.0.0/0            0.0.0.0/0            ADDRTYPE match dst-type LOCAL

Chain INPUT (policy ACCEPT)
num  target     prot opt source               destination

Chain OUTPUT (policy ACCEPT)
num  target     prot opt source               destination
1    REDIRECT   tcp  --  0.0.0.0/0            127.0.0.1            tcp dpt:443 redir ports 8443
2    REDIRECT   tcp  --  0.0.0.0/0            127.0.0.1            tcp dpt:80 redir ports 8080
3    DOCKER     all  --  0.0.0.0/0           !127.0.0.0/8          ADDRTYPE match dst-type LOCAL

Chain POSTROUTING (policy ACCEPT)
num  target     prot opt source               destination
1    MASQUERADE  all  --  172.17.0.0/16       0.0.0.0/0

Chain DOCKER (2 references)
num  target     prot opt source               destination
1    RETURN     all  --  0.0.0.0/0            0.0.0.0/0
```

Then, in my case, replace the first two entries of both the PREROUTING and OUTPUT chain:

**Note**: The default Docker subnet is **172.17.0.0/16**. If you changed the default configurations make sure to change them in the commands also.

**PREROUTING**

```
iptables -t nat -R PREROUTING 1 ! -s 172.17.0.0/16 -p tcp -m tcp --dport 80 -j REDIRECT --to-ports 8080
```

```
iptables -t nat -R PREROUTING 2 ! -s 172.17.0.0/16 -p tcp -m tcp --dport 443 -j REDIRECT --to-ports 8443
```

**OUTPUT**

```
sudo iptables -t nat -R OUTPUT 1 ! -s 172.17.0.0/16 -d 127.0.0.1/32 -p tcp -m tcp --dport 443 -j REDIRECT --to-ports 8443
```

```
sudo iptables -t nat -R OUTPUT 2 ! -s 172.17.0.0/16 -d 127.0.0.1/32 -p tcp -m tcp --dport 80 -j REDIRECT --to-ports 8080
```

Now, requests from the Docker container return with a 200 http status and everyone is happy 🤗 Hope this helps you if you are having a similar problem!

As a side note, while doing all this, I also needed to learn more about iptables and their different options. I found [this quick guide from **linode**](https://www.linode.com/docs/security/firewalls/control-network-traffic-with-iptables/) handy.

**Thanks for reading me!**