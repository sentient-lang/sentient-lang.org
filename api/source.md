---
title: "JavaScript API: Sentient.source"
header: /api
layout: default
---
# Sentient.source

The 'source' function returns the original source code of a pre-compiled
program:

```javascript
var sourceCode = Sentient.source(program);
// "a = 123; expose a;"
```

This is useful if you need to make changes to a pre-compiled program. It also
means that programs packaged for the web only need to include the pre-compiled
program if they wish to display the original source code.
