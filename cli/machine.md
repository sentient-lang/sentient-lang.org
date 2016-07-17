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

By default, the 'minisat' adapter is used, which is a version of MiniSat that
has been compiled into JavaScript with
[Emscripten](http://kripken.github.io/emscripten-site/). Sentient supports two
other adapters: 'lingeling' and 'riss'. These are usually faster but must be
installed before they can be used.
