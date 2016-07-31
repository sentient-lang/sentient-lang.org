---
title: "Getting started: Multiple solutions"
header: /tutorial
layout: default
---
# Multiple solutions

We can instruct Sentient to find multiple solutions for this program with the
'--number' option. Try running Sentient like so:

```bash
sentient ten.snt --number 3
```

You should see the following output:

```json
{"a":1,"b":1,"c":8}
{"a":5,"b":1,"c":4}
{"a":3,"b":1,"c":6}
```

Each solution appears on a new line as JSON. These solutions appear in no
particular order. You can also instruct Sentient to run exhaustively until it's
found all solutions:

```bash
sentient ten.snt --number 0
```

When you do this, the last line contains '{}'. This indicates that there are no
more solutions. You'd get the same result if you ran the program with
'--number 999'.
