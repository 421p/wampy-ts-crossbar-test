const process = require('process');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        exclude: [],
        files: [{
            pattern: './spec_bundle.js',
            watched: false
        }],
        preprocessors: {
            './spec_bundle.js': ['coverage', 'webpack', 'sourcemap']
        },
        webpack: require('./wampy.config.js'),
        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                {type: 'text-summary'},
                {type: 'json'},
                {type: 'html'}
            ]
        },
        webpackServer: {noInfo: true},
        reporters: ['mocha', 'coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true
    });
};