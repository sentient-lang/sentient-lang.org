---
title: "Examples: Golomb ruler"
header: /examples
layout: default
---
# Golomb ruler

The following program finds
[Golomb rulers](https://en.wikipedia.org/wiki/Golomb_ruler).

```sentient
{% include_relative golomb-ruler.snt %}```

By repeatedly adjusting the limit based on the result of the previous run,
Sentient can find the optimal ruler, which is thought to be an
[NP-hard](https://en.wikipedia.org/wiki/NP-hardness) problem.

## How does it work?

We [declare](../syntax/declaration) an array of integers for the 'ruler' and a
single integer for the 'limit'. We specify [invariants](../syntax/invariant) for
each property as described in the
[Wikipedia article](https://en.wikipedia.org/wiki/Golomb_ruler). We use
Sentient's [method syntax](../syntax/function#method-syntax) to simplify the
high-level code in the 'main' function.

The 'distances' function iterates through pairs of marks on the ruler with
['eachCombination'](../library/array#eachCombination). It
[pushes](../library/array#push) the difference between marks onto an array. The
'ascending?' function iterates through [consecutive](../library/array#eachCons)
elements to check if the element on the left is less than the right. The '&&='
syntax is shorthand for 'a = a && b'.

We then specify that rulers must begin at zero (a common convention) and
eliminate translated solutions by enforcing the smaller of the first and last
distances must be on the left. More generally, this technique is known as
[symmetry breaking](https://en.wikipedia.org/wiki/Symmetry-breaking_constraints).
The final invariant lets us limit our search to rulers shorter than a given
length.

## CLI example

Here is an example of running this program with the
[command-line interface](../cli/overview):

```bash
sentient --run golomb-ruler.json --assign '{ limit: 19 }' --number 0

# standard output:
{"limit":19,"ruler":[0,1,8,11,13,17]}
{"limit":19,"ruler":[0,1,4,10,12,17]}
{"limit":19,"ruler":[0,1,3,8,12,18]}
{"limit":19,"ruler":[0,2,6,7,15,18]}
{"limit":19,"ruler":[0,1,5,7,15,18]}
{"limit":19,"ruler":[0,1,8,12,14,17]}
{"limit":19,"ruler":[0,1,3,8,14,18]}
{"limit":19,"ruler":[0,1,4,10,15,17]}
{}
```

This finds [all rulers](../cli/number) with a length shorter than 19.
