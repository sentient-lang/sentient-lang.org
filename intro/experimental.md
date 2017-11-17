---
title: "Sentient is experimental"
header: Hello,
layout: default
---
# Sentient is experimental

Sentient is an experimental programming language. It was created by
[Chris Patuzzo](https://twitter.com/chrispatuzzo) out of desire to create high-level
abstractions for declarative programming. It solves a very specific kind of
problem and you probably aren't go to write your next web app with it.

In fact, Sentient isn't Turing complete. It is a
[Total programming language](https://en.wikipedia.org/wiki/Total_functional_programming) –
it is fully [decidable](https://en.wikipedia.org/wiki/Decidability_(logic)) and
does not suffer the
[Halting problem](https://en.wikipedia.org/wiki/Halting_problem). That
drastically limits what it can do. For example, recursive function calls are not
supported and never will be.

Despite these limitations, Sentient strives to be an expressive and capable
programming language. Under the hood, it uses state-of-the-art
[SAT](https://en.wikipedia.org/wiki/Boolean_satisfiability_problem) solvers to
rapidly find solutions. This is a field under
[active development](http://baldur.iti.kit.edu/sat-competition-2016/) and it
means that Sentient grows more powerful with each improvement. It brings
cutting-edge research to the masses.
