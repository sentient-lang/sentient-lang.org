---
title: "Language syntax: Exposure"
header: /syntax
layout: default
---
# Exposure

An exposure is used to expose a variable that will be **output** after the
program has run. Any exposed variable can also be **assigned** to a specific
value before the program runs. This allows you to run a single program with
different inputs. Here is an example:

```sentient
expose points;
```

You can expose multiple variables at the same time, for example:

```sentient
expose a, b, c, total;
```
