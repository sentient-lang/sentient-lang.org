---
title: "Examples: Disjoint rectangles"
header: /examples
layout: default
---
# Disjoint rectangles

The following program finds seven non-overlapping rectangles that fill a grid.
You can set any of the rectangles' coordinates or areas and Sentient will figure
out the rest.

```sentient
{% include_relative disjoint-rectangles.snt %}```

<script>
  SentientWebsite.loadSentient = true;
  SentientWebsite.modulesToLoad.push("DisjointRectangles");
</script>

You can touch the example above to cycle through solutions. The areas for the
yellow, red, orange, blue and green rectangles have been assigned to
[2, 4, 6, 9, 9] respectively.

This program could potentially be useful for generating interesting layouts for
photo galleries or web sites that use grid systems. It would be relatively
straightforward to incorporate additional constraints to suit the problem.

## How does it work?

We [declare](../syntax/declaration) the width and height of the grid and an
array of seven 'rectangles'. Each is an array that contains four elements
corresponding to the left, top, right and bottom edges of the rectangle. We also
declare an array to hold the areas for the rectangles. Later on we
[expose](../syntax/exposure) these variables so that we may get/set their values
at runtime.

We iterate through all pairs of rectangles with
'[eachCombination](../library/array#eachCombination)' and specify an
[invariant](../syntax/invariant) that they do not overlap. The 'overlap?'
function is called using Sentient's
[method syntax](../syntax/function#method-syntax) and is based on
[this Stack Overflow answer](http://stackoverflow.com/a/306332).

We then iterate through each rectangle and check it lies within the bounds of
the grid. We check that its top edge is above its bottom edge and that its left
edge is left of its right edge. We specify an invariant that the area of this
rectangle must equal one of the areas declared earlier. Finally, we insist that
the total area of the rectangles equals the grid.

## CLI example

Here is an example of running this program with the
[command-line interface](../cli/overview):

```bash
sentient --run disjoint-rectangles.json --assign '{ gridWidth: 16, gridHeight: 9 }'

# standard output:
{
  "gridWidth":16,
  "gridHeight":9,
  "rectangles":[
    [0,4,2,6],
    [15,6,16,9],
    [0,0,16,4],
    [2,4,3,6],
    [11,4,16,6],
    [0,6,15,9],
    [3,4,11,6]
  ],
  "areas":[4,3,64,2,10,45,16]
}
```

You can read the above output in pairs, for example, the first rectangle spans
the coordinates (0, 4) to (2, 6). You could optionally [assign](../cli/assign)
some of the rectangles:

```bash
sentient --run disjoint-rectangles.json \
         --assign '{ rectangles: { 0: [0, 0, 10, 10] } }'
```
