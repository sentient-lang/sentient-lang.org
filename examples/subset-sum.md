---
title: "Examples: Subset sum"
header: /examples
layout: default
---
# Subset sum

The following program solves the
[subset sum problem](https://en.wikipedia.org/wiki/Subset_sum_problem).

<img class="paperclip" src="/images/paperclip.png"/>

```sentient
{% include_relative subset-sum.snt %}```

<script>
  SentientWebsite.loadSentient = true;
  SentientWebsite.modulesToLoad.push("SubsetSum");
</script>

You can click on the grid to cycle through solutions.

## How does it work?

We [declare](../syntax/declaration) two arrays of twenty elements. The 'numbers'
array contains the numbers in the set which we will [assign](../cli/assign) at
runtime. The 'members' array contains booleans representing whether the number
at that index is in the subset.

We then set the 'sum' to 0 and iterate through the array of numbers. We look up
whether the number is a member of the subset. If it is, we add it to the sum.
Finally, we [expose](../syntax/exposure) all of the variables in our program as
we can access them at runtime.

This program uses [each](../library/array#each) from the standard library. It
makes use of the [**^** modifier](../syntax/function#variable-scope) to change
the scope of the function in order to access the 'sum' variable. It also uses
the [ternary form](../syntax/conditional) of a conditional.

## CLI example

Here is an example of running this program with the
[command-line interface](../cli/overview):

```bash
sentient --run subset-sum.json \
  --assign '{ numbers: [5, 8, 4, 11, 6], sum: 20 }'

# standard output:
{"sum":20,"numbers":[5,8,4,11,6],"members":[true,false,true,true,false]}
```
