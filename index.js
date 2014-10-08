var plugin = require('rtc-core/plugin');

/**
  # rtc-attach

  Roughly equivalent to the
  [`attachMediaStream`](https://www.npmjs.org/package/attachmediastream)
  package but with support for rtc.io plugins.

  ## Example Usage

  <<< examples/simple.js

  ## Example with using Plugins

  <<< examples/plugins.js

  ## Reference

  ### `attach(stream, opts?)`

  Attach `stream` to the specified target `el` (a new element is created if
  null). The following options can be supplied to tweak behaviour:

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
module.exports = function(stream, opts) {
  var elType = 'audio';
  var URL = typeof window != 'undefined' && window.URL;
  var autoplay = (opts || {}).autoplay;
  var el;

  // check the stream is valid
  isValid = stream && typeof stream.getVideoTracks == 'function';

  // determine the element type
  if (isValid && stream.getVideoTracks().length > 0) {
    elType = 'video';
  }

  // create an element if one has not been provided
  el = (opts || {}).el || document.createElement(elType);

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
};
