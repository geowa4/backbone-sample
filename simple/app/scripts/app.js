/*global define */
define(['backbone', 'challenges-view'], function (Backbone, ChallengesView) {
    'use strict';

    var App = function () {
        this.cv = new ChallengesView({
            el: document.getElementById('challenges')
        })

        this._listenToChallenges()
    }

    _.extend(App.prototype, Backbone.Events, {
        kill: function () {
            this.stopListening()
            this.cv.remove()
        },

        _listenToChallenges: function () {
            this
            .listenTo(this.cv, 'prepare-to-log', function (challengeId) {
                console.log('Preparing to log activity for Challenge #%d', challengeId)
            })
            .listenTo(this.cv, 'logged-activity', function (challengeId, msg) {
                console.log('Logged activity for Challenge #%d: %s', challengeId, msg)
            })
            .listenTo(this.cv, 'canceled-logging', function (challengeId) {
                console.log('Canceled logging for Challenge #%d', challengeId)
            })
        }
    })

    /*var listenToChallenges = function (cv) {
        cv
        .on('prepare-to-log', function (challengeId) {
            console.log('Preparing to log activity for Challenge #%d', challengeId)
        })
        .on('logged-activity', function (challengeId, msg) {
            console.log('Logged activity for Challenge #%d: %s', challengeId, msg)
        })
        .on('canceled-logging', function (challengeId) {
            console.log('Canceled logging for Challenge #%d', challengeId)
        })
    }*/

    return App
});