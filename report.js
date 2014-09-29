var maxmin = require('maxmin');
var fs = require('fs');

var max = fs.readFileSync('dist/carousel.js');
var min = fs.readFileSync('dist/carousel.min.js');
console.log(maxmin(max, min, true));
