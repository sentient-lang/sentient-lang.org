---
title: "Examples: Hello, world!"
header: /examples
layout: default
---
# Hello, world!

The following program finds three numbers that sum to 10.

```ruby
{% include_relative hello-world.snt %}```

## How does it work?

This example is explained in [more detail](../tutorial/hello) in the
[Getting started](../tutorial/introduction) guide.

## CLI example

Here is an example of running this program with the
[command-line interface](../cli/overview):

```bash
sentient --run hello-world.json --number 3

# standard output:
{"a":3,"b":4,"c":3}
{"a":1,"b":1,"c":8}
{"a":4,"b":1,"c":5}
```

Here is an example that finds a solution with 'a' set to '5':

```bash
sentient --run hello-world.json --assign '{ a: 5 }'

# standard output:
{"a":5,"b":3,"c":2}
```
