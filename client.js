var domready = require('domready');
var shoe = require('shoe');
var dnode = require('dnode');

domready(function () {
  'use strict';
  var result = document.getElementById('dnode-result');
  var stream = shoe('/dnode');

  var d = dnode();
  d.on('remote', function (remote) {
      remote.transform('beep', function (s) {
          result.textContent = 'beep => ' + s;
      });
  });

  d.pipe(stream).pipe(d);
});
