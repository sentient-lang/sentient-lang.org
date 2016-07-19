---
title: "Supported solvers: MiniSat"
header: /solvers
layout: default
---
# MiniSat

- **Authors:** Niklas Eén, Niklas Sörensson
- **Homepage:** [http://minisat.se/](http://minisat.se/)
- **License:** [https://github.com/niklasso/minisat/blob/master/LICENSE](https://github.com/niklasso/minisat/blob/master/LICENSE)

The MiniSat solver is Sentient's default. It is a version of MiniSat that has
been compiled to JavaScript with [Emscripten](http://emscripten.org). This means
that it can run in a web browser and it does not have any dependencies when run
from the command-line.

The MiniSat solver is the most *convenient* solver to use as it does not require
the installation of additional dependencies. Its license is more permissive than
others and it is therefore a sensible default for Sentient to use.

MiniSat may not be the fastest solver as it has been compiled to JavaScript
which impacts performance somewhat. For larger problems, it may be worth trying
one of the other solvers which tend to be written in C++.
