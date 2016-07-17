---
title: Sentient Programming Language
header: Hello,
layout: default
---
# Computer, here's my problem. Go figure.

Sentient is a declarative programming language that lets you describe *what*
your problem is and not *how* to solve it. Sentient tries to figure that out for
itself. It provides a rich toolkit to allow programmers to express their
problems in a familiar way.

Under the hood, it uses state-of-the-art
[SAT solvers](http://baldur.iti.kit.edu/sat-competition-2016/) to rapidly find
solutions. This is an active field that's constantly improving and it means
Sentient is decoupled from its solving processes. This lets Sentient focus on
the difficult problem of reducing high-level abstractions, used in modern
programming languages, to SAT.

Sentient is written in JavaScript and is extremely portable. It can be used as a
standalone application or as a dependency of other libraries and utilities.
It can be extended to use different SAT solvers and supports a variety of
solvers right out of the box.

Sentient was created by Chris Patuzzo as an exploration of declarative
programming.
