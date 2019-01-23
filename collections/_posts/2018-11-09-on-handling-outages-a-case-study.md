---
layout: post
title: "On handling outages: a case study"
ref: on-handling-outages
lang: en
date: 2018-11-9
comments: true
categories: [outage, communication]
---

If you happen to use Basecamp 3 to manage your projects, you might have noticed a huge outage on November 8th, 2018; **it lasted almost 5 hours**.

The issue was that they failed to use bigint for the primary keys of their tables so they ran out of IDs. The *TLDR* solution, taken from David Heinemeier- DHH, creator of Ruby on Rails and Founder and CTO at Basecamp:

> We took half of our replicas offline, did the 3h migration, put them back online, will now be converting the other half of the fleet.

And I'm not writing this to expose and/or throw **** at them.

I'm writing this to **applaud their communication and openness** about the whole outage.

I'm writing this to expose how **over-communication, honesty, humbleness and clarity DO make a difference**, specially on difficult situations.

---

To give you some context, the first notice on their Twitter account about something going wrong was at 5:40 AM on November, 8th:

<blockquote class="twitter-tweet" style="text-align: center;" data-lang="en"><p lang="en" dir="ltr">Basecamp 3 is having trouble right now. Sorry about that! We&#39;re working on a fix and will keep you updated as we go.</p>&mdash; Basecamp (@basecamp) <a href="https://twitter.com/basecamp/status/1060527469361537024?ref_src=twsrc%5Etfw">November 8, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

From that tweet and until everything was working again, there were 15 more tweets with constant updates! With the last one being at 10:47 AM, November 8th, signed by DHH himself:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Basecamp 3 is back up at the moment. We had to switch to a backup set of caching servers, and they&#39;re holding up at the moment. It&#39;s obviously been touch and go, so not out of the woods yet. Pains us to ask for even more patience on such a trying day. So sorry 😢 ^DHH</p>&mdash; Basecamp (@basecamp) <a href="https://twitter.com/basecamp/status/1060604787819827201?ref_src=twsrc%5Etfw">November 8, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

All that information is a **huge deal**. You know they are working really hard to get everything up and going, and you might also know that outages can get really messy.

Despite all the chaos that was probably happening, they kept posting updates with specific details of the cause and solution being taken- on their Twitter account, status page and on their blog. And not only that, DHH was also posting some more technical details about the outage to the point where **he links to the pull request that could have saved everything**:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I&#39;m not often ashamed of our work at <a href="https://twitter.com/basecamp?ref_src=twsrc%5Etfw">@basecamp</a>. But today is one such day. To be stuck in read-only mode for hours due to a failure to use bigint for our primary keys on every table is embarrassing. It&#39;s been the default in Rails since 5.1 🙈 <a href="https://t.co/FaGYDBrROU">https://t.co/FaGYDBrROU</a></p>&mdash; DHH (@dhh) <a href="https://twitter.com/dhh/status/1060565296048562177?ref_src=twsrc%5Etfw">November 8, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

---

I find all this **incredibly valuable and relieving**. Even though it was a really long outage, they handled each and every customer interaction gracefully. I could not get upset with them with so many information about the problem/solution being provided.

Hell, that morning **I was even more productive because Basecamp remained read-only**; I could check on what was pending on my side and just get to it with no distractions.

I've been part, and cause, of outages at my company and it's really stressful. And we don't even handle the amount of traffic Basecamp 3 does.

So, as DHH states it, **this is a reminder to stay humble**. We could be the next ones involved in a situation like this. **We all make mistakes, that's inevitable**, but knowing how to properly communicate them is what matters in the long run.

---

Hope you have enjoyed this short rambling ❤️
