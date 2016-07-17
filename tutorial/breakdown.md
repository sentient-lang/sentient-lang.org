---
title: "Getting started: Program breakdown"
header: /tutorial
layout: default
---
# Program breakdown

Here's an overview of what each of the lines in our 'Hello world' program mean.
For a more thorough explanation, you may wish to explore the
**Language syntax**.

```ruby
int a, b, c
```

This line [declares](../syntax/declaration) three integers named '**a**',
'**b**' and '**c**'. Integers can be both positive and negative numbers.

```ruby
invariant a + b + c == 10;
```

This line captures what we are trying to do. We want to find thre enumbers that
add to **10** and this line specifies this an
[invariant](../syntax/invariant) of the program, i.e. that this is
something that must always be **true**.

```ruby
invariant a > 0, b > 0, c > 0;
```

As mentioned above, integers can be negative. This line adds another
[invariant](../syntax/invariant) that rules out negatives. We didn't need
to do this, but it serves as an interesting example.

```ruby
expose a, b, c;
```

This line makes it so that '**a**', '**b**' and '**c**' all appear in the
program output when it runs. Variables must be explicitly
[exposed](../syntax/exposure) from Sentient programs.
