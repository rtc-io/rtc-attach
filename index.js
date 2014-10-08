var plugin = require('rtc-core/plugin');
var extend = require('cog/extend');

/**
  # rtc-attach

  Roughly equivalent to the
  [`attachMediaStream`](https://www.npmjs.org/package/attachmediastream)
  package but with support for rtc.io plugins.

  ## Example Usage

  <<< examples/simple.js

  ## Example using Plugins

  <<< examples/plugins.js

  ## Reference

  ### `attach(stream, opts?, callback)`

  Attach `stream` to a HTML element that will render the content. The provided
  `callback` follows the format of `fn(err, element)`.  While the async nature
  of this package may seem odd, because a plugin may need time to initialize
  this caters for this case in addition to standard usage in the browser.

  - `autoplay` (default: `true`) - by default after the stream has been
    attached to the element it will be played.  This is done by calling
    the `play()` function on the element rather than relying on `autoplay`
    attribute functionality.

  - `el` (default: `null`) - if you with to supply an element to be used
    instead of creating a new element to receive the stream specify it here.

  - `plugins` (default: `[]`) - specify one or more plugins that can be used
    to render the media stream appropriate to the current platform in the
    event that WebRTC and/or media capture is supported via a browser plugin.

**/
module.exports = function(stream, opts, callback) {
  var URL = typeof window != 'undefined' && window.URL;
  var el;
  var pinst;

  if (typeof opts == 'function') {
    callback = opts;
    opts = {};
  }

  function attach() {
    var autoplay = (opts || {}).autoplay;
    var prepareEl = (pinst && pinst.prepareElement) || prepareElement;
    var elType = 'audio';
    var el;

    // check the stream is valid
    isValid = stream && typeof stream.getVideoTracks == 'function';

    // determine the element type
    if (isValid && stream.getVideoTracks().length > 0) {
      elType = 'video';
    }

    // prepare the element
    el = prepareEl(extend({ type: elType }, opts), (opts || {}).el);

    // bind the stream

    // attach the stream
    if (URL && URL.createObjectURL) {
      el.src = URL.createObjectURL(stream);
    }
    else if (el.srcObject) {
      el.srcObject = stream;
    }
    else if (el.mozSrcObject) {
      el.mozSrcObject = stream;
    }

    if (autoplay === undefined || autoplay) {
      el.play();
    }

    return el;
  }

  function prepareElement(options, el) {
    return el || document.createElement(options.type);
  }

  // see if we are using a plugin
  pinst = plugin((opts || {}).plugins);
  if (pinst) {
    return pinst.init(opts, function(err) {
      if (err) {
        return callback(err);
      }

      callback(null, attach());
    });
  }

  callback(null, attach());
};
