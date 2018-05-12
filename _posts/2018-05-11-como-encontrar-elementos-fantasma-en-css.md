---
layout: post
title: Como Encontrar Elementos Fantasma en CSS
ref: how-to-find-ghost-css-elements
lang: es
date: 2018-05-11
comments: true
categories: [CSS, HTML]
---

Hace poco me encontré con un _bug_ en nuestra _landing page_ que causaba un extraño espacio en blanco en la parte derecha:

![Landing page espacio en blanco extra del lado derecho][landing-page-bug]

Busqué por un par de horas intentando encontrar algún espacio creado por CSS o algún elemento mal acomodado em my HTML, pero no pude encontrar nada fuera de lugar. El espacio en blanco ni siquiera estaba dentro del elemento de &lt;html&gt; de la página 🧐

Después [encontré este _post_](http://wernull.com/2013/04/debug-ghost-css-elements-causing-unwanted-scrolling/) y rápidamente encontré el problema. Éste _post_ sugiere unos estilos de CSS para hacer visible los elementos fantasma 👻:

```css
* {
  background: #000 !important;
  color: #0f0 !important;
  outline: solid #f00 1px !important;
}
```

Con esto pude encontrar la sección que estaba causando el problema:

![Landing page con elementos fantasma visibles][landing-page-ghost]

Al final, fue cuestión de unos elementos de HTML que no concordaban.

Si hubiese utilizado estos estilos de CSS para _debuggear_ desde un inicio, me hubiese ahorrado un par de horas de trabajo 🤦🏻‍♂️


[landing-page-bug]: /assets/find-ghost-css-elements/landing-page-bug-es.png "Landing page espacio en blanco extra del lado derecho"

[landing-page-ghost]: /assets/find-ghost-css-elements/landing-page-ghost-es.png "Landing page con elementos fantasma visibles"