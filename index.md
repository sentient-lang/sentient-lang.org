---
title: Sentient Programming Language
header: Hello,
layout: default
---
# Computer, here's my problem. Go figure.

Sentient is a
[high-level](intro/high-level), [declarative](intro/declarative) programming
language that lets you describe *what* your problem is and not *how* to solve
it. Sentient tries to figure that out for itself. It provides a rich toolkit to
allow programmers to express their problems in a familiar way.

The following program finds
[magic squares](https://en.wikipedia.org/wiki/Magic_square). We specify the
constraints (or invariants) of the problem, i.e. that all rows, columns and
diagonals must add to the same 'target'. We don't tell Sentient *how* to find
magic squares, we just describe what they are.

```ruby
{% include_relative examples/magic-square.snt %}```

<script>
  SentientWebsite.loadSentient = true;
  SentientWebsite.modulesToLoad.push("MagicSquare");
</script>

The example above is running in **real-time** in your browser. Sentient is
written in JavaScript and is extremely portable. It is an
[experimental](intro/experimental) language that was created by
[Chris Patuzzo](https://twitter.com/cpatuzzo) as an exploration of declarative
programming.
