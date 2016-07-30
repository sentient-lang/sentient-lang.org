---
title: "Command-line interface: --exposed"
header: /cli
layout: default
---
# \-\-exposed

The 'exposed' option prints information about [exposed](../syntax/exposure)
variables:

```
$ sentient --exposed program.json
{
  "a": {
    "type": "integer",
    "minimum": -128,
    "maximum": 127
  }
}
```

This option is useful to find out which variables are exposed so that they may
be [assigned](./assign). It is also useful to see what range of inputs they can
take. If a range needs to be extended, the only way to do so is by recompiling
the [source](./source) program.

Programs must be [compiled](./compile) before 'expose' can be used. This option
takes precedence over [run](./run) and [source](./source).
