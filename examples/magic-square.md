---
title: "Examples: Magic square"
header: /examples
layout: default
---
# Magic square

The following program finds
[magic squares](https://en.wikipedia.org/wiki/Magic_square).

```sentient
{% include_relative magic-square.snt %}```

<script>
  SentientWebsite.loadSentient = true;
  SentientWebsite.modulesToLoad.push("MagicSquare");
</script>

The example on the right lets you cycle through the different solutions for a
'target' value. You can lock cells to a specific number by clicking on them.

## How does it work?

We start by [declaring](../syntax/declaration) a 3x3 array to hold the numbers
in our square. We then loop through each row and column and specify that their
sum must equal the 'target'. We build arrays for the diagonals and specify that
their sum must also equal the 'target'.

This program makes use of [transpose](../library/array#transpose), which lets us
iterate over the numbers in the square by columns instead of rows. It passes
[positive?](../library/integer#positive?) as a
[function pointer](../syntax/function#function-pointers) to
[all?](../library/array#all?) to specify that all of the numbers in the square
must be positive.

## CLI example

Here is an example of running this program with the
[command-line interface](../cli/overview):

```bash
sentient --run magic-square.json --assign '{ target: 15 }' --number 3

# standard output:
{"target":15,"magic_square":[[5,9,1],[1,5,9],[9,1,5]]}
{"target":15,"magic_square":[[4,9,2],[3,5,7],[8,1,6]]}
{"target":15,"magic_square":[[7,4,4],[2,5,8],[6,6,3]]}
```

Here is an example that finds a solution with a '5' in the middle:

```bash
sentient --run magic-square.json --assign '{ magic_square: { 1: { 1: 5 } } }'

# standard output:
{"target":15,"magic_square":[[3,9,3],[5,5,5],[7,1,7]]}
```
