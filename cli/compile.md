---
title: "Command-line interface: --compile"
header: /cli
layout: default
---
# \-\-compile

The 'compile' option instructs Sentient to compile the program to machine code:

```bash
$ sentient --compile program.snt > program.json
```

It is useful to pre-compile a program when you intend to repeatedly run it with
different sets of assignments. For example, you might write a program to solve
Sudoku, then repeatedly run it with different inputs.
