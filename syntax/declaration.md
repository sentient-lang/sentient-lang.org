---
title: "Language syntax: Declaration"
header: /syntax
layout: default
---
# Declaration

A declaration is used to declare a variable for use in a program but without
specifying what its value is. Sentient programs are declarative and so the
values of their variables are not determined until the program runs.

A declaration is comprised of a type definition and the names of one or more
variables. Here is an example:

```ruby
int a, b, c;
```

Valid types are one of **int**, **bool** and **array**. By default, integers
range between **-128** and **127**, but this can be made bigger (or smaller) by
specifying the number of bits after the type. An **int10**, for example, will
range between **-512** and **511**.

```ruby
int10 a, b, c;
```

Declaring an array is a little more complicated. The size of the array must be
specified in the type definition in addition to the type of its elements. Arrays
are **homogeneous**, which means that its elements must all be the same type.
Here are some examples:

```ruby
array3<bool> myArray;

array4<int> fourInts;

array5<int20> fiveBigInts;
```

Nested arrays are supported. These declarations look a little more complicated.
The example below declares a structure that would be suitable for holding some
coordinates:

```ruby
array10<array2<int>> points;
```
