define(['backbone'], function (Backbone) {
    'use strict';

    var Score = Backbone.Model.extend({
            defaults: {
                value: 0
            }
        }),
        latestScore = 35

    return Backbone.Collection.extend({
        model: Score,

        sync: function (method, model, options) {
            options.success([{
                value: 16
            }, {
                value: 22
            }, {
                value: 31
            }, {
                value: 38
            }, {
                value: (latestScore += 3)
            }])
        }
    })
})