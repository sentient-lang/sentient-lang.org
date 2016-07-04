---
title: "Language specification: Conditional"
header: /specification
layout: default
---
# Conditional

Sentient supports conditionals as expressions. Both the consequent and alternate
must be provided and both branches will be evaluated, regardless of the return
value of the conditional. Here's an example:

```ruby
a = if(someCondition, valueIfTrue, valueIfFalse);
```

This can be equivalently written as:

```ruby
a = someCondition.if(valueIfTrue, valueIfFalse);
```

Or using a ternary form:

```ruby
a = someCondition ? valueIfTrue : valueIfFalse;
```

See [boolean](../library/boolean) for more information.
