---
title: "Supported solvers: Riss"
header: /solvers
layout: default
---
# Riss

- **Author:** Norbert Manthey
- **Homepage:** [http://tools.computational-logic.org/content/riss.php](http://tools.computational-logic.org/content/riss.php)
- **License:** [http://tools.computational-logic.org/content/riss/Riss.tar.gz](http://tools.computational-logic.org/content/riss/Riss.tar.gz)

The Riss solver has won [many competitions](http://www.satcompetition.org/)
and tends to be faster than the default [MiniSat](./minisat) solver. Its license
is restricted to evaluation and research purposes only. Sentient does not ship
with Lingeling and it must be installed separately.

Sentient also makes use of Riss during [optimisation](../cli/optimise). It uses
Riss's Coprocessor to simplify the resulting SAT problem, which reduces the run
time of the program. If you intend to use Sentient's optimiser, Riss's license
applies.

If you are on a Mac, Sentient-Lang provides a
[homebrew formula](https://github.com/sentient-lang/homebrew-riss) for
Riss.
