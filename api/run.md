---
title: "JavaScript API: Sentient.run"
header: /api
layout: default
---
# Sentient.run

The 'run' function is used to run a pre-compiled program:

```javascript
var results = Sentient.run({ program: myProgram });
// [{ a: 123 }]
```

Before programs can be run, they must be [compiled](./compile). Results are
returned as an array of objects containing [exposed](../syntax/exposure)
variables from the program.

## Callback

The 'callback' property species a callback function:

```javascript
Sentient.run({
  program: myProgram,
  callback: function (result) {
    // { a: 123 }
  })
});
```

The callback function will be called for each result of running the program. For
programs that take a while to run, it is recommended that you use a callback.

Additionally, when the 'number' option is used, it is **strongly recommended**
that you use a callback in order to handle results as soon as they arrive.
Otherwise, Sentient will wait for the program to finish running before all of
the results are returned in one go.

## Number

The 'number' property specifies how many solutions should be sought:

```javascript
Sentient.run({
  program: myProgram,
  number: 3,
  callback: myCallback
});
```

This is useful for finding multiple solutions to a problem or to check how many
solutions there are. By default, this value is set to 1. If a value of 0 is
specified, Sentient will keep searching for solutions until there are no more.

## Assignments

The 'assignments' property sets exposed variables within a program:

```javascript
Sentient.run({
  program: myProgram,
  assignments: { target: 10 },
});
```

This is useful to impose additional constraints on the program to find specific
solutions. Any variable that appears in an [exposure](../syntax/exposure) will
be assignable. Each variable to be assigned appears as a key of this objects.
Values can be booleans, integers or arrays:

```javascript
Sentient.run({
  program: myProgram,
  assignments: { a: true, b: 123, c: -50, d: [1, 2, 3] }
);
```

Arrays support additional syntax to allow some of their elements to be set,
whilst leaving others unset. Elements can be marked as 'undefined':

```javascript
Sentient.run({
  program: myProgram,
  assignments: { numbers: [1, undefined, undefined] }
);
```

Alternatively, elements can be set by their array index. All other elements will
be unset. The following is equivalent to the above example:

```javascript
Sentient.run({
  program: myProgram,
  assignments: { numbers: { 0: 1 } }
);
```
