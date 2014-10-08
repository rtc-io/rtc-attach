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

  ### `attach(stream, el?, opts?)`

  Attach `stream` to the specified target `el` (a new element is created if
  null). The following options can be supplied to tweak behaviour:

  - `autoplay` (default: `true`) - by default after the stream has been
    attached to the element it will be played.  This is done by calling
    the `play()` function on the element rather than relying on `autoplay`
    attribute functionality.

  - `plugins` (default: `[]`) - specify one or more plugins that can be used
    to render the media stream appropriate to the current platform in the
    event that WebRTC and/or media capture is supported via a browser plugin.

**/
module.exports = function(stream, el, opts) {
};
