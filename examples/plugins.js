var capture = require('rtc-capture');
var attach = require('..');
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
