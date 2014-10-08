var capture = require('rtc-capture');
var attach = require('..');

capture({ video: true, audio: true }, function(err, stream) {
  if (err) {
    return console.error('could not capture stream: ', stream);
  }

  document.body.appendChild(attach(stream));
});
