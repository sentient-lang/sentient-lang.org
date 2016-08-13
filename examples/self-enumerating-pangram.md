---
title: "Examples: Self-enumerating pangram"
header: /examples
layout: default
---
# Self-enumerating pangram

The following program finds
[self-enumerating pangrams](https://en.wikipedia.org/wiki/Autogram#Self-enumerating_pangrams).

```ruby
{% include_relative self-enumerating-pangram.snt.snippet %}```

Here is the
[full source code](https://github.com/sentient-lang/sentient-lang.org/blob/gh-pages/examples/self-enumerating-pangram.snt)
and
[compiled program](https://github.com/sentient-lang/sentient-lang.org/blob/gh-pages/compiled/self-enumerating-pangram.json)
on Github. This program takes a minute or two to run with the
[lingeling](../solvers/lingeling) solver. Here is a solution:

<blockquote>
This pangram lists four a's, one b, one c, two d's, twenty-two e's, seven f's,
two g's, two h's, nine i's, one j, one k, two l's, two m's, twenty n's, nineteen
o's, two p's, one q, five r's, twenty-six s's, twenty-two t's, four u's,
five v's, fourteen w's, two x's, five y's and one z.
</blockquote>

## How does it work?

We start by [declaring](../syntax/declaration) arrays for the 'sentenceSeed' and
'letterCounts'. The 'sentenceSeed' counts how many of each letter appear in
'This sentence contains ... and', or whichever seed is (assigned)[../cli/assign]
at runtime. The 'letterCounts' array contains the expected number of each letter
that appears in the sentence.

We then use 'letterCounts' to determine the actual number of each letter. Later
on, we specify that the expected 'letterCounts' must equal the actual
'numberOfEachLetter', which is the crux of this problem. We also check that
[all](../library/array#all?) elements in these arrays are in bounds, which helps
the [optimiser](../cli/optimise) simplify the program.

To calculate the actual number of each letter, we use the 'lookupTable' to
[map](../library/array#map) 'letterCounts' to the number of letters that appear
in the number-words (e.g 'ONE', 'TWO'). We sum these for each letter and add the
'mandatoryLetter' that must appear in the sentence, e.g.
(one **a**, two **b**'s). We add the 'sentenceSeed' and the 'numberOfPlurals'
that follow each term in the sentence (e.g two b'**s**, three c'**s**).

## CLI example

Here is an example of running this program with the
[command-line interface](../cli/overview):

```bash
sentient                               \
  --run self-enumerating-pangram.json  \
  --assign-file assignment.json        \
  --machine lingeling

# assignment.json
{
  // This pangram lists ... and
  "sentenceSeed":[3,0,0,1,0,0,1,1,2,0,0,1,1,2,0,1,0,1,3,2,0,0,0,0,0,0]
}

# standard output:
{
  "sentenceSeed":[3,0,0,1,0,0,1,1,2,0,0,1,1,2,0,1,0,1,3,2,0,0,0,0,0,0],
  "letterCounts":[4,1,1,2,22,7,2,2,9,1,1,2,2,20,19,2,1,5,26,22,4,5,14,2,5,1]
}
```

The above example uses the [assign-file](../cli/assign-file) option which is
convenient for large inputs.
