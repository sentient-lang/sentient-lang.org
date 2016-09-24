---
title: "Sentient is high-level"
header: Hello,
layout: default
---
# Sentient is high-level

Sentient strives to be a high-level programming language. It tries to provide
features that programmers are already familiar with, like arrays and functions.
It has a rich standard library that is filled with useful things, like
[map](../library/array#map) and [reduce](../library/array#reduce):

```sentient
[1, 2, 3].map(*square).sum
#=> 14
```

Sentient's syntax is simple and straightforward and can be learned quickly. It
is influenced by the [Ruby](http://ruby-lang.org/) programming language and
[JavaScript](https://www.javascript.com/):

```sentient
[1, 2, 3].any?(function (n) {
  return n == 2;
});
#=> true
```
