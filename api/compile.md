---
title: "JavaScript API: Sentient.compile"
header: /api
layout: default
---
# Sentient.compile

The 'compile' function compiles a program to machine code:

```javascript
var program = Sentient.compile("a = 123; expose a;");
```

Programs need to be compiled before they can be [run](./run). Where possible, it
is better to pre-compile programs offline using the command-line interface, but
you can use the 'compile' function shown above if you need to compile in a
browser.

## Callback

Sentient programs can be compiled asynchronously:

```javascript
Sentient.compile("a = 123; expose a;", function (program) {
  // ...
});
```

The callback function will be called once the program has finished compiling.
For longer programs that take a while to compile, it is recommended that you use
a callback.
