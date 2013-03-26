/*global define */
define(['underscore', 'backbone', 'google-analytics', 'challenges-view'], 
function (_, Backbone, GoogleAnalytics, ChallengesView) {
    'use strict';

    var App = function () {
        this.ga = new GoogleAnalytics()
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
            var gaTrackEvent = _.bind(this.ga.trackEvent, this.ga)
            this.ga
            .listenTo(this.cv, 'prepare-to-log', _.partial(gaTrackEvent, 'prepare-to-log'))
            .listenTo(this.cv, 'logged-activity', _.partial(gaTrackEvent, 'logged-activity'))
            .listenTo(this.cv, 'canceled-logging', _.partial(gaTrackEvent, 'canceled-logging'))
        }
    })

    return App
});