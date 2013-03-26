/*global define */
define(['underscore', 'backbone', 'google-analytics', 'challenges-view', 'leaderboard-view'], 
function (_, Backbone, GoogleAnalytics, ChallengesView, LeaderboardView) {
    'use strict';

    var App = function () {
        this.ga = new GoogleAnalytics('UA-XXXXX-X')
        this.cv = new ChallengesView({
            el: document.getElementById('challenges')
        })
        this.lv = new LeaderboardView()
        this.lv.render().$el.appendTo(document.getElementById('right'))

        this._listen()
        this.ga.trackPageView()
    }

    _.extend(App.prototype, Backbone.Events, {
        kill: function () {
            this.stopListening()
            this.cv.stopListening()
            this.lv.stopListening()
            this.cv.remove()
            this.lv.remove()
        },

        _listen: function () {
            var ga = this.ga, cv = this.cv, lv = this.lv,
                gaTrackEvent = _.bind(this.ga.trackEvent, this.ga),
                challengeEvents = ['prepare-to-log', 'logged-activity', 'canceled-logging']
            _.each(challengeEvents, function (eventName) {
                ga.listenTo(cv, eventName, _.partial(gaTrackEvent, eventName))
            })
            lv.listenTo(cv, 'logged-activity', _.bind(lv.update, lv))
        }
    })

    return App
});