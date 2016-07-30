---
title: Sentient Programming Language
header: Hello,
layout: default
---
# Computer, here's my problem. Go figure.

Sentient is a
[declarative](https://en.wikipedia.org/wiki/Declarative_programming) programming
language that lets you describe *what* your problem is and not *how* to solve
it. Sentient tries to figure that out for itself. It provides a rich toolkit to
allow programmers to express their problems in a familiar way.

The following example is a Sentient program that finds
[magic squares](https://en.wikipedia.org/wiki/Magic_square). We describe the
constraints (or invariants) of the problem, i.e. that all rows, columns and
diagonals must add to the same 'target', but at no point do we write an
algorithm to solve it.

```ruby
array3<array3<int>> magic_square;
int target;

magic_square.each(function^ (row) {
  invariant row.sum == target;
  invariant row.all?(*positive?);
});

magic_square.transpose.each(function^ (column) {
  invariant column.sum == target;
});

left_diagonal = magic_square.map(function (row, index) {
  return row[index];
});

right_diagonal = magic_square.map(function (row, index) {
  return row.reverse[index];
});

invariant left_diagonal.sum == target;
invariant right_diagonal.sum == target;

expose magic_square, target;
```

Under the hood, it uses state-of-the-art
[SAT](https://en.wikipedia.org/wiki/Boolean_satisfiability_problem) solvers to
rapidly find solutions. This is a field under
[active development](http://baldur.iti.kit.edu/sat-competition-2016/) and it
means Sentient is decoupled from its solving processes. This lets Sentient focus
on the difficult problem of reducing high-level abstractions, used in modern
programming languages, to SAT.

Sentient is written in JavaScript and is extremely portable. It can be used as a
standalone application or as a dependency of other libraries and utilities.
It can be extended to use different SAT solvers and supports a variety right out
of the box.

Sentient was created by [Chris Patuzzo](https://twitter.com/cpatuzzo) out of
curiosity about declarative programming.
