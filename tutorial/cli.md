---
title: "Getting started: Command-line interface"
header: /tutorial
layout: default
---
# Command-line interface

On a command-line run:

```bash
sentient --help
```

This will present the various options provided by the executable. As you can
see, Sentient supports the compilation and running of programs as well as a few
other things, which we'll come to later.

```
Usage: sentient [options] [file]

Sentient Language Compiler and Runtime, Version 0.0.0-alpha.34

Options:

  -h, --help                output usage information
  -v, --version             output the version number
  -c, --compile             compile a program to machine code
  -o, --optimise            optimise a compiled program
  -r, --run                 run a compiled program
  -s, --source              output the source of a compiled program
  -e, --exposed             output exposed variables of a compiled program
  -a, --assign '<json>'     assign some of the exposed variables
  -f, --assign-file <file>  read assignments from a file
  -n, --number <n>          find the given number of solutions
  -m, --machine <name>      use the specified machine adapter
  -i, --info                set the log level to info
  -d, --debug               set the log level to debug
```

For now, we're going to be using Sentient in its vanilla mode without any
options. By default, Sentient will compile and run programs in a single step and
print the results. We're going to be using this in our 'Hello, world!' example.
