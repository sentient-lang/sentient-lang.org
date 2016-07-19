---
title: "Command-line interface: --machine"
header: /cli
layout: default
---
# \-\-machine

The 'machine' option instructs Sentient to use a different SAT solver:

```
$ sentient --machine lingeling
```

By default, the '[minisat](../solvers/minisat)' adapter is used, which is a
version of MiniSat that has been compiled into JavaScript with
[Emscripten](http://kripken.github.io/emscripten-site/). Sentient supports two
other adapters: '[lingeling](../solvers/lingeling)' and
'[riss](../solvers/riss)'. These are usually faster but must be installed before
they can be used.

Please note that it is **your responsibility** to ensure you comply with the
license for the solver you intend to use. For more information on the different
solvers, please refer to this [overview](../solvers/overview).
