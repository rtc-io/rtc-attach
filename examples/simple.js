var capture = require('rtc-capture');
var attach = require('..');

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
