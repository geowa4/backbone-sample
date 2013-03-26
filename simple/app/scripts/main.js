require.config({
    paths: {
        jquery: '../components/jquery/jquery',
        bootstrap: 'vendor/bootstrap',
        underscore: '../components/underscore-amd/underscore',
        backbone: '../components/backbone-amd/backbone',
        d3: '../components/d3/d3'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        d3: {
            exports: 'd3'
        }
    }
});

require(['app', 'jquery', 'bootstrap'], function (App) {
    'use strict';

    window.app = new App()
});