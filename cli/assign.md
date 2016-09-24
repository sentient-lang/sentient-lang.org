---
title: "Command-line interface: --assign"
header: /cli
layout: default
---
# \-\-assign

The 'assign' option sets exposed variables within a program:

```bash
$ sentient --assign '{ target: 10 }' program.snt
```

The 'assign' option is useful to impose additional constraints on the program
when it runs to find specific solutions. It does not affect compilation in any
way. This means that the same program can be run with different sets of inputs.

Any variable that appears in an [exposure](../syntax/exposure) will be
assignable. Assignments are specified as a JSON object surrounded by quotes.
Each variable to be assigned appears as a key of this object. Values can be
booleans, integers or arrays:

```bash
$ sentient --assign '{ a: true, b: 123, c: -50 }' program.snt

$ sentient --assign '{ numbers: [1, 2, 3] }' program.snt
```

Arrays support additional syntax to allow some of their elements to be set,
whilst leaving others unset. Elements can be marked as 'undefined':

```bash
$ sentient --assign '{ numbers: [1, undefined, undefined] }' program.snt
```

Alternatively, elements can be set by their array index. All other elements will
be unset. The following is equivalent to the above example:

```bash
$ sentient --assign '{ numbers: { 0: 1 } }' program.snt
```
