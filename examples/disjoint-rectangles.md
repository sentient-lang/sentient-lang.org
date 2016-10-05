---
title: "Examples: Disjoint rectangles"
header: /examples
layout: default
---
# Disjoint rectangles

The following program finds seven non-overlapping rectangles that fill a grid.

```sentient
{% include_relative disjoint-rectangles.snt %}```

An interactive example of this program is coming soon!

## How does it work?

We [declare](../syntax/declaration) an array of seven 'rectangles'. Each is an
array that contains four elements corresponding to the left, top, right and
bottom edges of the rectangle. We also declare the width and height of the grid.
Later on we [expose](../syntax/exposure) these variables so that we may get/set
their values at runtime.

We iterate through all pairs of rectangles with
'[eachCombination](../library/array#eachCombination)' and specify an
[invariant](../syntax/invariant) that they do not overlap. The 'overlap?'
function is called using Sentient's
[method syntax](../syntax/function#method-syntax) and is based on
[this Stack Overflow answer](http://stackoverflow.com/a/306332).

We then iterate through each rectangle to check that it lies within the bounds
of the grid. We check that its top edge is above its bottom edge and that its
left edge is left of its right edge. Finally, we insist that the total area of
the rectangles is equal to the area of the grid.

## CLI example

Here is an example of running this program with the
[command-line interface](../cli/overview):

```bash
sentient --run disjoint-rectangles.json --assign '{ width: 80, height: 60 }'

# standard output:
{
  "width":80,
  "height":60,
  "rectangles":[
    [0,0,14,6],
    [14,0,41,19],
    [14,19,80,40],
    [77,40,80,60],
    [0,6,14,60],
    [41,0,80,19],
    [14,40,77,60]
  ]
}
```

You can read the above output in pairs, for example, the first rectangle spans
the coordinates (0, 0) to (14, 6). You could optionally [assign](../cli/assign)
some of the rectangles:

```bash
sentient --run disjoint-rectangles.json \
         --assign '{ rectangles: { 0: [0, 0, 50, 50] } }'
```
