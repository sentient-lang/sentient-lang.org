---
title: "Examples: Power concatenation"
header: /examples
layout: default
---
# Power concatenation

The following program finds
[power concatenations](http://www.cbarker.net/thoughts/power-concatenation) for
square numbers. For example, 16 and 9 are both square numbers and their
concatenation is 169, which is also square.

```sentient
{% include_relative power-concatenation.snt %}```

Sentient finds all 29 solutions up to one million in about 40 seconds. The
smallest and largest three solutions are given below:

<blockquote>
Smallest:<br/>
"4" + "9" = "49"    (roots: 2, 3, 7)<br/>
"16" + "9" = "169"  (roots: 4, 3, 13)<br/>
"36" + "1" = "361"  (roots: 6, 1, 19)<br/>
<br/>
Largest:<br/>
"81" + "9025" = "819025"  (roots 9, 95, 905)<br/>
"9" + "50625" = "950625"  (roots 3, 225, 975)<br/>
"9" + "70225" = "970225"  (roots 3, 265, 985)<br/>
</blockquote>

## How does it work?

We [declare](../syntax/declaration) three integers and square them. This has the
effect that a, b and c will be square numbers. We then concatenate 'a' with 'b'
and specify an [invariant](../syntax/invariant) that the result is equal to 'c'.
The call to 'concatenate' uses Sentient's
[method syntax](../syntax/function#method-syntax).

The 'concatenate' function works by calculating a 'multiplier', which is the
number of decimal places to shift 'a' to the left before adding 'b' to the
result. This 'multiplier' is determined by a nested
[conditional](../syntax/conditional) that considers the value of 'b'. The
invariant ensures we haven't fallen off the end of the conditional which is the
case when 'b' is too large.

The 'main' function finishes by specifying a couple more invariants. The first
rules out trivial solutions (e.g. "0" + "9" = "9"). The second reinforces the
limit of one million that could be exceeded in 'c' as a result of the
concatenation. Finally, we [expose](../syntax/expose) a, b and c.

## CLI example

Here is an example of running this program with the
[command-line interface](../cli/overview):

```bash
sentient --run power-concatenation.json --machine riss --number 3

# standard output:
{"a":4,"b":900,"c":4900}
{"a":4,"b":225,"c":4225}
{"a":4,"b":2025,"c":42025}
```

The [riss solver](../solvers/riss) seems noticeably faster than the others at
this problem.
