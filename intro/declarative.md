---
title: "Sentient is declarative"
header: Hello,
layout: default
---
# Sentient is declarative

Sentient is a declarative programming language, similar to
[Prolog](https://en.wikipedia.org/wiki/Prolog),
[miniKanren](http://minikanren.org/) and [Alloy](https://en.wikipedia.org/wiki/Alloy_(specification_language)). Programs are descriptions of problems,
rather than precise sets of instructions for the computer to follow. Sentient
changes how you think about programming.

For example, an imperative program that solves Sudoku puzzles might try putting
random numbers in the grid, then backtracking if it turns out they were
incorrect. A declarative program would describe the rules of the puzzle, but
wouldn't implement an algorithm to solve it. The language implementation is
responsible for that.

Another way to think about this is to assume someone has given you a solution to
your problem. A Sentient program describes how to check that solution for
correctness. Sentient uses this description and works backwards to solve the
problem for itself.
