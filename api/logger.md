---
title: "JavaScript API: Sentient.logger"
header: /api
layout: default
---
# Sentient.logger

The 'logger' property can be used to configure the logger:

```javascript
Sentient.logger.level = "info";
```

Valid log levels, from least to most verbose, are 'silent', 'error', 'info' and
'debug'. The default log level is 'silent' which means no messages will be
logged. When the 'error' log level is used, Sentient will catch and log errors
before re-raising them.

## Custom function

By default, Sentient will log to 'console', but it is possible to set a custom
log function:

```javascript
Sentient.logger.log = function (message, level) {
  var label = document.getElementById("myLabel");
  label.innerHTML = level + ": " + message;
};
```

You may wish to do this if a user can provide input to Sentient so that they can
receive feedback if something goes wrong. If the level is 'error' the message
passed to the function will actually be the JavaScript error object rather than
a string.

## Reset

It is possible to reset the logger back to its defaults:

```javascript
Sentient.logger.reset();
```

This sets the log level back to 'silent' and restores the default log function.
