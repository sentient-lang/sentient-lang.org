---
title: "Language specification: Assignment"
header: /specification
layout: default
---
# Assignment

An assignment is used to assign an [expression](expression) to a variable. Here
is an example:

```ruby
a = 2 + 2;
```

You **do not** need to [declare](declaration) variables first. Their type will
be inferred from the expression being assigned. You can assign multiple
expressions to variables at the same time:

```ruby
a, b, c = 10, true, [123];
```

It is possible to combine assignment with arithmetic and boolean operators:

```ruby
total += 1;
```
