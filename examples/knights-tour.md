---
title: "Examples: Knights tour"
header: /examples
layout: default
---
# Knights tour

The following program solves the
[knights tour problem](https://en.wikipedia.org/wiki/Knight%27s_tour).

```ruby
{% include_relative knights-tour.snt %}```

<script>
  SentientWebsite.loadSentient = true;
  SentientWebsite.modulesToLoad.push("KnightsTour");
</script>

You can touch the chessboard on the right to try a different tour.

## How does it work?

We [declare](../syntax/declaration) an array of 64 elements to hold the
coordinates of the tour. We iterate through
[eachConsecutive](../library/array#eachCons) pair of coordinates and specify
that it must be valid to go between them. The 'validMove?' function checks if
the knight moved in an L-shape.

We specify that all coordinates must be in bounds and unique, otherwise it
wouldn't be a valid tour. Finally, we check to see if the tour is 'closed',
which is defined to be whether the last coordinate loops back round to the start
again.

This program [assigns](../syntax/assignment) multiple expressions at once. It
makes use of [function pointers](../syntax/function#function-pointers) and the
[method syntax](../syntax/function#method-syntax) to call 'x' and 'y' on
coordinates. It also wraps the high-level code in a 'main' function so that it
can be placed at the top of the file.

## CLI example

Here is an example of running this program with the
[command-line interface](../cli/overview):

```bash
sentient --run knights-tour.json --number 3

# standard output:
{"isClosed":false,"knightsTour":[[1,3],[2,5],[4,4], ...]}
{"isClosed":false,"knightsTour":[[2,2],[1,4],[3,5], ...]}
{"isClosed":false,"knightsTour":[[2,4],[1,2],[3,1], ...]}
```

You can specify that only 'closed' tours should be returned like so:

```bash
sentient --run knights-tour.json --assign '{ isClosed: true }'

# standard output:
{}
```

The output above means that Sentient has concluded there are no solutions to the
problem. For a 5x5 chessboard, this is correct. Sentient arrives at this
conclusion in about four seconds.
