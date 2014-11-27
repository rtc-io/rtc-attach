# rtc-attach

Roughly equivalent to the
[`attachMediaStream`](https://www.npmjs.org/package/attachmediastream)
package but with support for rtc.io plugins.  Also uses an error first
async API to allow plugins time to initialize.


[![NPM](https://nodei.co/npm/rtc-attach.png)](https://nodei.co/npm/rtc-attach/)

[![unstable](https://img.shields.io/badge/stability-unstable-yellowgreen.svg)](https://github.com/dominictarr/stability#unstable) 
[![rtc.io google group](http://img.shields.io/badge/discuss-rtc.io-blue.svg)](https://groups.google.com/forum/#!forum/rtc-io)



## Example Usage

```js
var capture = require('rtc-capture');
var attach = require('rtc-attach');

capture({ video: true, audio: true }, function(err, stream) {
  if (err) {
    return console.error('could not capture stream: ', stream);
  }

  attach.local(stream, function(err, el) {
    if (err) {
      return console.error('could not attach stream to element: ', err);
    }

    document.body.appendChild(el);
  });
});

```

## Example using Plugins

```js
var capture = require('rtc-capture');
var attach = require('rtc-attach');
var opts = {
  plugins: [
    require('rtc-plugin-nicta-ios'),
    require('rtc-plugin-temasys')
  ]
};

capture({ audio: true, video: true }, opts, function(err, stream) {
  if (err) {
    return console.error('could not capture stream: ', err);
  }

  attach.local(stream, opts, function(err, el) {
    if (err) {
      return console.error('could not attach stream: ', err);
    }

    document.body.appendChild(el);
  });
});

```

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

- `muted` (default: `false`) - whether the created element should be muted
  or not.  For local streams this should almost always, be true so consider
  using the `attach.local` helper function for simple cases.

- `plugins` (default: `[]`) - specify one or more plugins that can be used
  to render the media stream appropriate to the current platform in the
  event that WebRTC and/or media capture is supported via a browser plugin.

### `attach.local(stream, opts?, callback)`

Attach a local stream with options appropriate for local streams:

- `muted`: `true`

## License(s)

### Apache 2.0

Copyright 2014 National ICT Australia Limited (NICTA)

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
