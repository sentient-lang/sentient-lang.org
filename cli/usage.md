---
title: "Command-line interface: Basic usage"
header: /cli
layout: default
---
# Basic usage

The CLI can read from either a file or standard input:

```bash
$ sentient program.snt

$ cat program.snt | sentient
```

If Sentient is called without arguments, it will wait for user-input:

```bash
$ sentient
<user enters input>
<Ctrl-d>
```

By default, Sentient will [compile](./compile) and [run](./run) the provided
program without [optimisation](./optimise). When an option is set, Sentient no
longer compiles and runs the input program and instead performs the task for
that option. For example:

```bash
$ sentient --compile program.snt > program.json
```

The above command will compile the program and write its output to a JSON file.
This program can then be run with:

```bash
$ sentient --run program.json
```

Options can be combined to perform a series of operations in a single command:

```bash
$ sentient --compile --optimise --run program.snt
```
