---
title: "Getting started: Assigning variables"
header: /tutorial
layout: default
---
# Assigning variables

We can assign values to variables at runtime. Try running the following:

```bash
sentient ten.snt --assign '{ a: 5 }'
```

This will run the same program as before but with an added constraint that the
value of '**a**' must be **5**. This means that you can write a *generic*
program that solves some problem and then assign some of its variables at
runtime to suit your needs.

For example, you might write a generic program for solving Sudoku puzzles. You
could then assign some of its variables at runtime for each of the numbers you
know about. Sentient will then solve the puzzle with those constraints set.

For our 'Hello world' program, we could make it more generic! Instead of
hardcoding the total to **10**, let's introduce a '**target**' and assign it at
runtime:

```javascript
int a, b, c, target;

invariant a + b + c == target;
invariant a > 0, b > 0, c > 0;

expose a, b, c, target;
```

```bash
sentient ten.snt --assign '{ target: 15 }'
```

Perhaps we should rename our program to something more appropriate!
