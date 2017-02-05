# js_fetch
Wrapper around jQuery AJAX requests - allows to run code before and after each request and logs errors automatically.

Created as an example [for my blog](http://blog.ikvasnica.com/entry/jquery-run-a-code-before-and-after-each-ajax-request).

## Usage
```
AJAX
  .fetch('backend_script.php', dataObj, $(this))
  .done(function (response) {
    console.log(response)
  })
```