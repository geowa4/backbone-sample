require.config({
    paths: {
        jquery: '../components/jquery/jquery',
        bootstrap: 'vendor/bootstrap',
        underscore: '../components/underscore-amd/underscore',
        backbone: '../components/backbone-amd/backbone'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        backbone: {
            deps: ['underscore'],
            exports: 'backbone'
        }
    }
});

require(['app', 'jquery', 'bootstrap'], function (App) {
    'use strict';

    window.app = new App()
});