---
title: "Language specification: Expression"
header: /specification
layout: default
---
# Expression

An expression can contain any combination of variables, constants,
operators and [function calls](function). Expressions must appear as part of an
[assignment](assignment) with the exception that function calls may appear by
themselves. Here are some examples:

```ruby
total = (1 + x) * -3;

a = (b || c) && d;

myArray = [1, 2, 3];

y = cube(5) + square(x);

updateTotal(25);
```

Most of the operators you'd expect are supported as well as a large collection
of built-in functions. Please refer to the [boolean](../library/boolean),
[integer](../library/integer) and [array](../library/array) references for
more information.
