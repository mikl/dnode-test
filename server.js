// Test dnode server.
'use strict';

var http = require('http');
var shoe = require('shoe');
var ecstatic = require('ecstatic')(__dirname + '/static');
var dnode = require('dnode');

var server = http.createServer(ecstatic);
server.listen(9999);

var sock = shoe(function (stream) {
    var d = dnode({
        transform : function (s, cb) {
            var res = s.replace(/[aeiou]{2,}/, 'oo').toUpperCase();
            cb(res);
        }
    });

    d.on('ready', function () {
        console.log('ready event on dnode');
    });
    
    d.on('end', function () {
        console.log('end event on dnode');
    });

    stream.on('end', function () {
        console.log('end event on stream');
    });

    d.pipe(stream).pipe(d);
});

sock.on('end', function () {
    console.log('end event on sock');
});

sock.on('log', function (severity, msg) {
    console.log(severity + ': ' + msg);
});

sock.install(server, '/dnode');

console.log('dnode server ready');
