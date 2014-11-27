var crel = require('crel');
var capture = require('rtc-capture');
var attach = require('..');
var targetVideo = crel('video');

capture({ video: true, audio: true }, function(err, stream) {
  if (err) {
    return console.error('could not capture stream: ', stream);
  }

  attach.local(stream, { target: targetVideo }, function(err, el) {
    if (err) {
      return console.error('could not attach stream to element: ', err);
    }

    console.log('used target: ', targetVideo === el);
    document.body.appendChild(el);
  });
});
