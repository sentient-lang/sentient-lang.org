---
title: "Command-line interface: --help"
header: /cli
layout: default
---
# \-\-help

Prints usage information:

```
$ sentient --help

  Usage: sentient [options] [file]

  Sentient Language Compiler and Runtime, Version 1.0.0

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
