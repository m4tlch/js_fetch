var AJAX = {
  /* HELPER WRAPPER FUNCTIONS */
  logAjaxError: function (jqXHR, textStatus, errorThrown) {
      console.log('AJAX ERROR:' + errorThrown)
  },

  isDefined: function (subject) {
    return typeof subject !== 'undefined'
  },

  // check whether response contains an error message and logs them
  handleAjaxError: function (response) {
    if (AJAX.isDefined(response.error) && AJAX.isDefined(response.error_description)) {
        AJAX.logAjaxError(response.error_description)
    }
  },

  // MAIN FETCH METHOD - customized $.get() AJAX request with possibility of applying custom/default callbacks to a target element
  fetch: function (url, data, targetObj, callbackStart, callbackEnd) {
    // cache provided to callbacks
    var cache = {}

    // all default callbacks are applied if no custom callbacks are provided
    var getDefaultCallbacks = function () {
      // default callbacks definitions (MUST be usable both for start and ending)
      return {
        changeText: function (targetObj) {
          var currentText = targetObj.text()
          var newText = (AJAX.isDefined(cache.oldText) ? cache.oldText : 'Loading...')
          targetObj.text(newText)
          cache.oldText = currentText
        },

        toggleClass: function (targetObj) {
          targetObj.toggleClass('loading')
        }
      }
    }

    // iterate over available callbacks and run them
    var runCallbacks = function (customCallback, targetObj) {
      // if no target object has been provided, don't run any callback
      if (!targetObj) {
        return false
      }

      // get a runnable callback list (either custom callback or default callbacks)
      var callbacksToRun = (AJAX.isDefined(customCallback) ? {custom: customCallback} : getDefaultCallbacks())

      // run callbacks
      for (var callback in callbacksToRun) {
        if (callbacksToRun.hasOwnProperty(callback) && typeof callbacksToRun[callback] === 'function') {
          callbacksToRun[callback](targetObj)
        }
      }
    }

    // if target object is provided, run start callbacks on it
    targetObj = (this.isDefined(targetObj) ? targetObj : null)
    runCallbacks(callbackStart, targetObj)

    return $
      .get(url, data)
      .done(this.handleAjaxError)
      .fail(this.logAjaxError)
      .always(function () {
        // if target object is provided, run end callbacks on it
        runCallbacks(callbackEnd, targetObj)
      })
  }
}
