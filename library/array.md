---
title: "Standard library: Array methods"
header: /library
layout: default
---
# Array methods

Arrays are one of three types in the Sentient programming language. This
document contains a reference of all array operators and methods.

##### <a id="=="></a> [== (operator)](#==)

Returns **true** if the array on the left is equal to the right.

```sentient
[1, 2, 3] == [1, 2, 3]    #=> true
[1, 2, 3] == [1, 2, 4]    #=> false
```

##### <a id="!="></a> [!= (operator)](#!=)

Returns **true** if the array on the left is not equal to the right.

```sentient
[1, 2, 3] != [1, 2, 3]    #=> false
[1, 2, 3] != [1, 2, 4]    #=> true
```

##### <a id="[]"></a> [[] (operator)](#[])

Fetches the element at an index from the array.

```sentient
[5, 10, 15].fetch(1)    #=> 10
```

The index must not fall outside the bounds of the array, else the program will
have no solutions.

##### <a id="all?"></a> [all?](#all?)

Returns **true** if the given function returns true for all elements in the
array.

```sentient
[1, 3, 5].all?(*odd?)    #=> true

[1, 2, 3].all?(function (e) {
  return e > 2;
});
#=> false
```

##### <a id="any?"></a> [any?](#any?)

Returns **true** if the given function returns true for any element in the
array.

```sentient
[1, 2, 3].any?(*even?)    #=> true

[1, 2, 3].any?(function (e) {
  return e > 3;
});
#=> false
```

##### <a id="bounds?"></a> [bounds?](#bounds?)

Returns **true** if the index is within the bounds of the array.

```sentient
[1, 2, 3].bounds?(-1)    #=> false
[1, 2, 3].bounds?(0)     #=> true
[1, 2, 3].bounds?(3)     #=> false
```

##### <a id="buildArray"></a> [buildArray](#buildArray)

Returns a new array populated with the given objects.

```sentient
buildArray(1, 2, 3)    #=> [1, 2, 3]
buildArray(true)       #=> [true]
```

##### <a id="collect"></a> [collect](#collect)

Alias for [**map**](#map).

##### <a id="count"></a> [count](#count)

Alias for [**length**](#length).

##### <a id="countBy"></a> [countBy](#countBy)

Counts the number of elements for which the given function returns **true**.

```sentient
[1, 2, 3].countBy(*odd?)     #=> 2

[1, 2, 3].countBy(function (e) {
  return e > 2;
});
#=> 1
```

##### <a id="each"></a> [each](#each)

Iterates through each element in the array.

```sentient
total = 0;

[1, 2, 3].each(function^ (element) {
  total += element;
});

# total: 6
```

You may optionally provide an **index** argument for the function:

```sentient
[1, 2, 3].each(function^ (element, index) {
  # index is 0, then 1, then 2
});
```

You may optionally provide an **isPresent** argument for the function. This is to
cater for cases where the length of the array is undetermined until the program
runs.

```sentient
nestedArray = [
  [10],
  [20, 30]
];

int index;

nestedArray[index].each(function^ (element, index, isPresent) {
  # ...
});
```

In the example above, the value of **index** is undetermined until the program
runs. If a value of 0 is chosen, **element** will be 0 and **isPresent** will be
false when the second element is reached during iteration.

##### <a id="eachCombination"></a> [eachCombination](#eachCombination)

Iterates through all combinations of N elements in the array:

```sentient
[1, 2, 3].eachCombination(2, function (elements) {
  # Elements:
  #
  # [1, 2]
  # [1, 3]
  # [2, 3]
});
```

You may optionally provide **indexes** and **presence** arguments:

```sentient
[1, 2, 3].eachCombination(2, function (elements, indexes, presence) {
  # ...
});
```

See [**each**](#each) for more information on what these arguments mean.

##### <a id="eachCons"></a> [eachCons](#eachCons)

Iterates through consecutive elements in the array:

```sentient
[1, 2, 3, 4].eachCons(2, function (elements) {
  # Elements:
  #
  # [1, 2]
  # [2, 3]
  # [3, 4]
});
```

You may optionally provide **indexes** and **presence** arguments:

```sentient
[1, 2, 3].eachCons(2, function (elements, indexes, presence) {
  # ...
});
```

See [**each**](#each) for more information on what these arguments mean.

##### <a id="eachSlice"></a> [eachSlice](#eachSlice)

Iterates through the array N elements at a time:

```sentient
[1, 2, 3, 4].eachSlice(2, function (elements) {
  # Elements:
  #
  # [1, 2]
  # [3, 4]
});
```

You may optionally provide **indexes** and **presence** arguments:

```sentient
[1, 2, 3].eachSlice(2, function (elements, indexes, presence) {
  # ...
});
```

See [**each**](#each) for more information on what these arguments mean.

##### <a id="first"></a> [first](#first)

Returns the first element in the array.

```sentient
[1, 2, 3].first    #=> 1
```

##### <a id="get"></a> [get](#get)

Gets the element at an index and performs bounds checking.

If the index lies outside the bounds of the array, 0 or false will be returned
depending on the type of elements in the array. The second argument returned is
a boolean that is true if the index is in bounds.

```sentient
a, b = [5, 10, 15].get(1)     # a: 10, b: true
a, b = [5, 10, 15].get(-1)    # a: 0,  b: false
a, b = [5, 10, 15].get(99)    # a: 0,  b: false
```

##### <a id="include?"></a> [include?](#include?)

Returns **true** if the array includes the given element.

```sentient
[1, 2, 3].include?(3)    #=> true
[1, 2, 3].include?(4)    #=> false
```

##### <a id="last"></a> [last](#last)

Returns the last element in the array.

```sentient
[1, 2, 3].last    #=> 3
```

##### <a id="length"></a> [length](#length)

Returns the length of the array.

```sentient
[1, 2, 3].length    #=> 3
```

##### <a id="map"></a> [map](#map)

Maps a function over each element in an array:

```sentient
[1, 2, 3].map(function (element) {
  return element * 2;
});
#=> [2, 4, 6]

[1, 2, 3].map(*square);
#=> [1, 4, 9]
```

You may optionally provide an **index** argument for the function:

```sentient
[1, 2, 3].map(function (element, index) {
  return element * index;
});
#=> [0, 2, 6]
```

##### <a id="none?"></a> [none?](#none?)

Returns **true** if none of the elements cause the given function to return
**true**.

```sentient
[1, 3].none?(*even?)    #=> true

[1, 2, 3].none?(function (e) {
  return e > 2;
});
#=> false
```

##### <a id="one?"></a> [one?](#one?)

Returns **true** if exactly one element causes the given function to return
**true**.

```sentient
[1, 3].one?(*even?)          #=> false
[1, 2, 3].one?(*even?)       #=> true
[1, 2, 3, 4].one?(*even?)    #=> false
```

##### <a id="push"></a> [push](push)

Returns a new array containing the original elements with a new element added to
the end. Does not mutate the original array.

```sentient
[1, 2].push(3)
#=> [1, 2, 3]

[false].push(true).push(true)
#=> [false, true, true]
```

Push can be used to flatten an array:

```sentient
flat = [];

[[1, 2], [3, 4]].each(function^ (nested) {
  nested.each(function^ (element) {
    flat = flat.push(element);
  });
});

# flat: [1, 2, 3, 4]
```

In this case, the variable is re-assigned, not mutated.

##### <a id="reduce"></a> [reduce](#reduce)

Combines elements of an array by applying binary function. Returns the
accumulated value.

```sentient
[2, 3, 4].reduce(function (accumulator, element) {
  return accumulator * element;
});
#=> 24

[1, 2, 3].reduce(*+)
#=> 6
```

Reduce can optionally take an initial value:

```sentient
[1, 2, 3].reduce(10, *+)
#=> 16
```

You may optionally provide an **index** and **isPresent** argument:

```sentient
[1, 2, 3].reduce(function (accumulator, element, index, isPresent) {
  # ...
});
```

See [**each**](#each) for more information on what these arguments mean.

##### <a id="reject"></a> [reject](#reject)

Returns an array containing all elements where the function returns **false**.

```sentient
[1, 2, 3].reject(*odd?)
#=> [2]

[2, 3, 4, 5].reject(function (element) {
  return element.square > 10;
});
#=> [2, 3]
```

You may optionally provide an **index** and **isPresent** argument:

```sentient
[1, 2, 3].reject(function (element, index, isPresent) {
  # ...
});
```

See [**each**](#each) for more information on what these arguments mean.


##### <a id="reverse"></a> [reverse](#reverse)

Reverses an array:

```sentient
[1, 2, 3].reverse
#=> [3, 2, 1]

[[10], [20, 30]].reverse
#=> [[20, 30], [10]]
```

##### <a id="select"></a> [select](#select)

Returns an array containing all elements where the function returns **true**.

```sentient
[1, 2, 3].select(*odd?)
#=> [1, 3]

[2, 3, 4, 5].select(function (element) {
  return element.square > 10;
});
#=> [4, 5]
```

You may optionally provide an **index** and **isPresent** argument:

```sentient
[1, 2, 3].select(function (element, index, isPresent) {
  # ...
});
```

See [**each**](#each) for more information on what these arguments mean.

##### <a id="self"></a> [self](#self)

Returns the array:

```sentient
[1, 2, 3].self
#=> [1, 2, 3]
```

##### <a id="size"></a> [size](#size)

Alias for [**length**](#length).

##### <a id="sum"></a> [sum](#sum)

Sums the elements in an array of integers:

```sentient
[1, 2, 3].sum
#=> 6

[[10], [20, 30]].map(*sum).sum
#=> 60
```

##### <a id="transpose"></a> [transpose](#transpose)

Transposes a nested array, swapping columns for rows:

```sentient
nestedArray = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

t = nestedArray.transpose

# t: [
#   [1, 4, 7],
#   [2, 5, 8],
#   [3, 6, 9]
# ]
```

Transpose works for nested arrays of different lengths:

```sentient
nestedArray = [
  [1, 2],
  [3, 4, 5],
  [6, 7]
];

t = nestedArray.transpose

# t: [
#   [1, 3, 6],
#   [2, 4, 7],
#   [5]
# ]
```

If this array is iterated, any gaps will set **isPresent** to false. See
[**each**](#each) for more information.

##### <a id="uniq?"></a> [uniq?](#uniq?)

Returns **true** if the array contains unique elements.

```sentient
[1, 2, 3].uniq?    #=> true
[1, 2, 1].uniq?    #=> false
```

Equality will be used to check uniqueness.

##### <a id="uniqBy?"></a> [uniqBy?](#uniqBy?)

Returns **true** if the array contains unique elements when a given function is
called on the array's elements.

```sentient
[1, 3].uniqBy?(*odd?)    #=> true
[1, 3].uniqBy?(*odd?)    #=> false
```

