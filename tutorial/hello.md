---
title: "Getting started: Hello, world!"
header: /tutorial
layout: default
---
# Hello, world!

Our 'Hello, world!' example won't actually print 'Hello, world!'. Instead, we're
going to be writing a simple program that finds three numbers that add up to
ten. To begin with, create a file called `ten.snt` and add the following lines:

```javascript
int a, b, c;

invariant a + b + c == 10;
invariant a > 0, b > 0, c > 0;

expose a, b, c;
```

We'll go through this program in more detail in a minute. For now, save the file
and run `sentient ten.snt`. You should see the following output:

```json
{"a":1,"b":1,"c":8}
```

As you can see, Sentient has successfully found three numbers that add to 10.
Notice that we didn't tell Sentient *how* to find an answer, we just described
*what* we wanted and Sentient figured the rest out for itself.
