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

  document.body.appendChild(attach(stream, opts));
});
