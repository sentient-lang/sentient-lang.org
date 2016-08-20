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

The following Sentient program solves the
[subset sum problem](https://en.wikipedia.org/wiki/Subset_sum_problem). The
challenge is to find a subset of numbers that add up to the given sum. This
program iterates through an array of 'numbers' and adds them to the 'sum' if
they are a 'member' of the subset. We don't tell Sentient *how* to solve the
subset sum problem, we just describe *what* it is.

<img class="paperclip" src="/images/paperclip.png"/>

```ruby
{% include_relative examples/subset-sum.snt %}```

<script>
  SentientWebsite.loadSentient = true;
  SentientWebsite.modulesToLoad.push("SubsetSum");
</script>

The example above is running in **real-time** in your browser. Sentient is
written in JavaScript and is extremely portable. You can compile and run
programs on a [command-line](cli/overview) or [in a browser](api/overview).
Sentient can integrate with web applications or node modules alike.

Sentient is an [experimental](intro/experimental) programming language that was
created by [Chris Patuzzo](https://twitter.com/cpatuzzo) as an exploration of
declarative programming. It's still in development and has a few rough edges.
You can listen to the story of its inception on the
[Why Are Computers](http://whyarecomputers.com/4) podcast.
