var capture = require('rtc-capture');
var attach = require('rtc-attach');
var kgo = require('kgo');

kgo({
  constraints: { video: true, audio: true },
  opts: {
    plugins: [
      require('rtc-plugin-nicta-ios'),
      require('rtc-plugin-temasys')
    ]
  }
})
('capture', ['constraints', 'opts'], capture)
('attach', ['capture', 'opts'], attach)
('dom-insert', ['attach'], function(el) {
  document.body.appendChild(el);
})
.on('error', function(err) {
  console.error('captured error: ', err);
});
