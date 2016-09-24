---
title: "Command-line interface: --number"
header: /cli
layout: default
---
# \-\-number

The 'number' option specifies how many solutions should be sought:

```bash
$ sentient --number 5 program.snt
```

This is useful for finding multiple solutions to a problem or to check how many
solutions there are. By default, this value is set to 1. If a value of 0 is
specified, Sentient will keep searching for solutions until there are no more:

```bash
$ sentient --number 0 program.snt
```
