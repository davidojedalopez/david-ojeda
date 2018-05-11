---
layout: post
title: How to Find Ghost CSS Elements
ref: how-to-find-ghost-css-elements
lang: en
date: 2018-05-11
comments: true
categories: [CSS, HTML]
---

I recently came across a bug on our landing page which caused a weird blank space overflow on the right side:

![Landing page with extra white space on right side][landing-page-bug]

I looked for a couple of hours trying to find any CSS spacing causing it, or some wrong element on my HTML, but couldn't find anything out of place. The blank space wasn't even inside the &lt;html&gt; element of the page 🧐

I then [stumbled upon this post](http://wernull.com/2013/04/debug-ghost-css-elements-causing-unwanted-scrolling/) and rapidly found the problem. This blog post suggests some CSS styles to make ghost elements visible 👻:

```css
* {
  background: #000 !important;
  color: #0f0 !important;
  outline: solid #f00 1px !important;
}
```

Now, I could find the section that was causing the problem:

![Landing page with ghost elements visible][landing-page-ghost]

In the end, it was a matter of fixing some mismatching HTML elements.

Would've had this CSS styles helping me debug from the beginning, could've saved me a couple hours of work 🤦🏻‍♂️


[landing-page-bug]: /assets/find-ghost-css-elements/landing-page-bug.png "Landing page with extra white space on right side"

[landing-page-ghost]: /assets/find-ghost-css-elements/landing-page-ghost.png "Landing page with ghost elements visible"