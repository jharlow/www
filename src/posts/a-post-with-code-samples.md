---
title: A post with code samples
date: '2024-01-01'
thumbnail:
  file: 'sample-post-texture.jpg'
  description: A texture of paper
description: As this blog is open-source, here's a sample post showing you all the styling/embedding that comes with it out-of-the-box.
tags:
  - demo-content
  - code
  - blog
---

This blog is entirely [open source](https://github.com/jharlow/blog), so I thought I would create an example post that gives examples of the key markdown features available.

## General markdown

Obviously, you can use _italics_ and **emphasis** in your text. You can also create `<blockquote>`s:

> Maecenas faucibus mollis interdum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.

A list:

- Sed posuere consectetur est at lobortis
- Aenean lacinia bibendum nulla sed consectetur
- Sed posuere consectetur est at lobortis

How about an ordered list:

1. Sed posuere consectetur est at lobortis
2. Aenean lacinia bibendum nulla sed consectetur
3. Sed posuere consectetur est at lobortis

And a simple table:

| Column1 | Column2 |
| ------- | ------- |
| Item1.1 | Item2.1 |
| Item1.2 | Item2.2 |

## Media

It's simple to self-host and include images, which are converted to use `<figure>` and `<figcaption>` if a description is provided:

![The top of a grey concrete building with a blue sky in the background](/images/demo-image-1.jpg 'Brutalism at its finest. Photo by Artificial Photography on Unsplash.')

You can also add videos to posts from YouTube or Vimeo (or wherever, really) and the front-end will also make those bleed-out for you too.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_38JDGnr0vA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Technical components

The most common thing you'll want to do is provide `code` snippets. First, there is a standard code-block that takes a file type and provides syntax highlighting:

```css
.post {
  padding: 1rem;
}
```

There's one special feature to a code block. Including `// filename: name` will append that filename above the code-block like so:

```js
// filename: this/that/filename.ts
const test: Test = {
  foo: 'oen',
  bar: 2
};
```

If you want to include beautiful screen recordings, you can use the video embedding. Personally, I prefer to use `asciinema`, which is a terminal-based text player:

{% asciinema "yrkIY8pZ655d4xQ2KI2q01esV", "fzf demo" %}

And finally, here's an example of a simple graph built using `d3` in an external script:

<div id="container"></div>
<script src="https://d3js.org/d3.v4.js"></script>
<script type="module" defer="defer" async src="/posts/js/graph.js"></script>
