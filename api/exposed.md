---
title: "JavaScript API: Sentient.exposed"
header: /api
layout: default
---
# Sentient.exposed

The 'exposed' function returns information about [exposed](../syntax/exposure)
variables:

```javascript
var variables = Sentient.exposed(program);
```

Objects are keyed by variable name:

```json
{
  "a": {
    "type": "integer",
    "minimum": -128,
    "maximum": 127
  }
}
```

This is useful to find out which variables are exposed so that they may be
[assigned](./run#assignments). It is also useful to see what range of inputs
they can take. If a range needs to be extended, the only way to do so is by
recompiling the [source](./source) program.

Programs must be [compiled](./compile) before 'exposed' can be used.
