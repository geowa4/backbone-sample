/*global define */
define(['underscore', 'backbone', 'google-analytics', 'challenges-view', 'leaderboard', 'leaderboard-view'], 
function (_, Backbone, GoogleAnalytics, ChallengesView, Leaderboard, LeaderboardView) {
    'use strict';

    var App = function () {
        this.ga = new GoogleAnalytics('UA-XXXXX-X')
        this.cv = new ChallengesView({
            el: document.getElementById('challenges')
        })
        this.leaderboard = new Leaderboard()
        this.lv = new LeaderboardView({
            collection: this.leaderboard
        })
        this.leaderboard.fetch({
            success: _.bind(function () {
                this.lv.$el.appendTo(document.getElementById('right'))
            }, this)
        })

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
                leaderboard = this.leaderboard,
                gaTrackEvent = _.bind(this.ga.trackEvent, this.ga),
                challengeEvents = ['prepare-to-log', 'logged-activity', 'canceled-logging']
            
            _.each(challengeEvents, function (eventName) {
                ga.listenTo(cv, eventName, _.partial(gaTrackEvent, eventName))
            })
            lv.listenTo(cv, 'logged-activity', function () {
                leaderboard.fetch()
            })
        }
    })

    return App
});