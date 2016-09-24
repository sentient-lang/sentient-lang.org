---
title: "Standard library: Boolean methods"
header: /library
layout: default
---
# Boolean methods

Booleans are one of three types in the Sentient programming language. This
document contains a reference of all boolean operators and methods.

##### <a id="&&"></a> [&& (operator)](#&&)

Logical AND.

```sentient
true && true      #=> true
true && false     #=> false
false && true     #=> false
false && false    #=> false
```

##### <a id="||"></a> [|| (operator)](#||)

Logical OR.

```sentient
true || true      #=> true
true || false     #=> true
false || true     #=> true
false || false    #=> false
```

##### <a id="=="></a> [== (operator)](#==)

Returns **true** if the boolean on the left is equal to the right.

```sentient
true == true      #=> true
true == false     #=> false
false == true     #=> false
false == false    #=> true
```

##### <a id="!="></a> [!= (operator)](#!=)

Returns **true** if the boolean on the left is not equal to the right.

```sentient
true != true      #=> false
true != false     #=> true
false != true     #=> true
false != false    #=> false
```

##### <a id="!@"></a> [!@ (operator)](#!@)

Performs unary negation.

```sentient
!true     #=> false
!false    #=> true
```

##### <a id="?:"></a> [?: (operator)](#?:)

Ternary conditional, see [**if**](#if).

```sentient
true ? 5 : 3     #=> 5
false ? 5 : 3    #=> 3
```

##### <a id="if"></a> [if](#if)

Returns the value on the left if the conditional is **true** and the value on
the right if the conditional is **false**.

```sentient
true.if(5, 3)     #=> 5
false.if(5, 3)    #=> 3
```

Both the left and right expressions must be provided and will be evaluated,
irrespective of the condition.

##### <a id="self"></a> [self](#self)

Returns the boolean.

```sentient
true.self
#=> true
```
