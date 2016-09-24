---
title: "Command-line interface: --source"
header: /cli
layout: default
---
# \-\-source

The 'source' option prints the original source code of a pre-compiled program:

```bash
$ sentient --source program.json > program.snt
```

The 'source' option is useful if you need to make changes to a pre-compiled
program. It also means that programs packaged for the web only need to include
the pre-compiled program if they wish to display the original source code.

This option takes precedence over [run](./run).
