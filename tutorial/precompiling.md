---
title: "Getting started: Pre-compiling"
header: /tutorial
layout: default
---
# Pre-compiling

So far, we've been compiling and running programs in a single step. This works
well for simple programs, but usually you'll want to pre-compile programs
beforehand. This lets you do more of the work upfront, which speeds up programs
at when they run:

```bash
sentient ten.snt --compile > ten.json
```

Sentient programs are compiled to JSON. You can run compiled programs like so:

```bash
sentient ten.json --run
```

One advantage of pre-compiling programs is that you can
[optimise](../cli/optimise) them to run much faster. We won't get into that now
because our program already runs quickly.
