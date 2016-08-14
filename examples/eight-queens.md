---
title: "Examples: Eight queens"
header: /examples
layout: default
---
# Eight queens

The following program solves the
[eight queens puzzle](https://en.wikipedia.org/wiki/Eight_queens_puzzle).

```ruby
{% include_relative eight-queens.snt %}```

<script>
  SentientWebsite.loadSentient = true;
  SentientWebsite.modulesToLoad.push("EightQueens");
</script>

You can touch the chessboard on the right to cycle through different solutions.

## How does it work?

We [declare](../syntax/declaration) an array of eight queens, which are
represented as (x, y) coordinates. We iterate through all possible pairs of
queen with [eachCombination](../library/array#eachCombination) and specify that
they must not be attacking. We then check that all queens are in-bounds.

To determine whether two queens are attacking, we check if they are on the same
row, column or diagonal. To test the diagonals, we add and subtract the
components of the coordinates and compare these values.

This program uses the [method syntax](../syntax/function#method-syntax) to help
with readibility. It also wraps the high-level code in a 'main' function so that
it can be placed at the top of the file.

## CLI example

Here is an example of running this program with the
[command-line interface](../cli/overview):

```bash
sentient --run eight-queens.json --number 0

# standard output:
{"queens":[[1,3],[2,5],[3,7],[4,1],[5,4],[6,2],[7,8],[8,6]]}
{"queens":[[1,4],[2,8],[3,5],[4,3],[5,1],[6,7],[7,2],[8,6]]}
{"queens":[[1,8],[2,2],[3,5],[4,3],[5,1],[6,7],[7,4],[8,6]]}
# ...
```

Sentient finds 92 unique solutions in about 6 seconds.
