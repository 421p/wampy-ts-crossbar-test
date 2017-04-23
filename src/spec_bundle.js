Error.stackTraceLimit = Infinity;
require('core-js/es6');
require('core-js/es7/reflect');
require('ts-helpers');
require('rxjs/Rx');

var context = require.context('./tests', true, /\.spec\.ts/);
context.keys().forEach(context);
