---
title: "Supported solvers: Overview"
header: /solvers
layout: default
---
# Overview

This section contains a list of SAT solvers that are supported by Sentient.
These solvers can be used as backends for running Sentient programs using the
[machine](../cli/machine) option of the command-line interface. It may be the
case that a particular solver is better suited to solving certain types of
problem.

Sentient uses the [MiniSat](./minisat) solver by default and this is the only
supported solver when using the JavaScript API. In order to use other solvers
via the command-line interface, they must be installed separately. If a solver
is used that isn't installed, Sentient will error and output an installation
script that might be helpful.

Please note that it is **your responsibility** to to ensure you comply with the
license for the solver you intend to use. Links to each solver's license can be
found on the pages in this section. If you would like to add support for another
solver, please get in touch by
[opening an issue](https://github.com/sentient-lang/sentient-lang/issues) on the
project.
