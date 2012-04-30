# jQuery Input History

jQuery plugin to make an input field act like a command prompt with history
and keyboard shortcuts.

See [demo]()

## Documentation

```js
$('input').inputHistory(options);
```

where `options` is an object with any of the following optional properties

**size** number of lines of history to remember.

**store** number keyCode to listen for to store a line, or a function.
  The function will be called with a keydown event and should return true
  when the input value should be stored in the history.
  default: enter && !shift

**prev** keyCode or function to return last input.

**next** keyCode or function to return next input.

**data** name of data field to store input history object. default: inputHistory