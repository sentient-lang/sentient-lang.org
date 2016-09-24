---
title: "Language syntax: Function"
header: /syntax
layout: default
---
# Function

A function is used to combine a sequence of statements so that it may be called
multiple times throughout a program. Functions also allow names to be given to
sections of code, improving readability. Here is an example:

```sentient
function fizzbuzz? (number) {
  divisibleBy3 = number % 3 == 0;
  divisibleBy5 = number % 5 == 0;

  return divisibleBy3 && divisibleBy5;
};
```

The following sections explain how functions are defined and called in Sentient.
These sections get progressively more complicated but you should be able to
glean the basics without understanding all of its intricacy.

## Defining functions

Functions can be defined anywhere in a program, including inside other
functions. All function names are global and if a function definition appears
with the same name elsewhere, it will be redefined.

Function names can optionally be suffixed with a single **?** or **!**
character.  Functions can take any number of arguments and can return any number
of values. Here is an example:

```sentient
function payForGoods (cost, balance) {
  balance -= cost;
  overdrawn = balance < 0;

  return balance, overdrawn;
};
```

If a function returns values, its return statement must appear as the last
statement in a function.

## Variable scope

By default, functions have local scope and cannot access variables from outside.
Functions are pass-by-value, which means that a copy is made of the function's
arguments when they are passed in.

It is possible to define functions that can access variables outside by using
the **^** modifier. The following example updates the **balance** variable,
which appears outside of the defined function:

```sentient
balance = 1000;

function^ payForGoods (cost) {
  balance -= cost;
  overdrawn = balance < 0;

  return overdrawn;
};
```

If functions are nested, the **^** modified will not provide access to variables
outside of the outermost function unless that also uses the **^** modifier.

## Calling functions

Functions are called by passing arguments within parentheses. You can either
call functions as part of an assignment or in a statement on their own. This is
to support cases where functions have side-effects such as this example:

```sentient
payForGoods(50);
```

When functions return more than one value, you can use multiple assignment to
set those values to variables:

```sentient
div, mod = divmod(10, 3);
```

## Method syntax

It is also possible to call functions using a **method** syntax. Any function can
be called on any value and that value will be passed as the first argument to
the function. Here is an example:

```sentient
div, mod = 10.divmod(3);
```

When functions are called as methods, the parentheses are optional unless there
are additional arguments, for example:

```sentient
a = 75.fizzbuzz?;
```

In fact, almost all syntax in the language is described as method calls on
values which means that these are all equivalent:

```sentient
a = 2 + 2;
a = +(2, 2);
a = 2.+(2);
```

## Function pointers

It is possible to pass functions as arguments to other functions using function
pointers. You can pass any number of pointers to a function. A function pointer
is denoted by prefixing a **\*** to an argument:

```sentient
function callTwice (x, *f) {
  return f(f(x));
};

function double (x) {
  return x * 2;
};

a = 5.callTwice(*double);
```

Sentient also supports anonymous functions, which can be passed in to other
functions. Here is an example that adds the numbers in an array:

```sentient
array5<int> numbers;
total = 0;

numbers.each(function^ (number) {
  total += number;
});

expose numbers, total;
```
