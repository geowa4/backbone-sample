/*global define */
define(['underscore', 'backbone', 'google-analytics', 'challenges-view', 'leaderboard', 'leaderboard-view', 'personal-scores', 'score-trend'], 
function (_, Backbone, GoogleAnalytics, ChallengesView, Leaderboard, LeaderboardView, PersonalScores, ScoreTrend) {
    'use strict';

    var App = function () {
        this.ga = new GoogleAnalytics('UA-XXXXX-X')
        
        this._initChallenges()
        this._initLeaderboard()
        this._initScores()

        this._listen()
        this.ga.trackPageView()
    }

    _.extend(App.prototype, Backbone.Events, {

        _initChallenges: function () {

            this.cv = new ChallengesView({
                el: document.getElementById('challenges')
            })
        
        },

        _initLeaderboard: function () {

            this.leaderboard = new Leaderboard()
            this.lv = new LeaderboardView({
                collection: this.leaderboard
            })
            this.leaderboard.fetch({
                success: _.bind(function () {
                    this.lv.$el.appendTo(document.getElementById('right'))
                }, this)
            })

        },

        _initScores: function () {

            this.personalScores = new PersonalScores()
            this.scoreTrend = new ScoreTrend({
                collection: this.personalScores
            })
            this.personalScores.fetch({
                success: _.bind(function () {
                    this.scoreTrend.$el.appendTo(document.getElementById('right'))
                }, this)
            })

        },

        _listen: function () {

            var ga = this.ga, cv = this.cv, lv = this.lv,
                leaderboard = this.leaderboard,
                personalScores = this.personalScores,
                gaTrackEvent = _.bind(this.ga.trackEvent, this.ga),
                challengeEvents = ['prepare-to-log', 'logged-activity', 'canceled-logging']
            
            _.each(challengeEvents, function (eventName) {
                ga.listenTo(cv, eventName, _.partial(gaTrackEvent, eventName))
            })
            lv.listenTo(cv, 'logged-activity', function () {
                leaderboard.fetch()
                personalScores.fetch()
            })
            
        },

        kill: function () {
            this.stopListening()
            this.cv.remove()
            this.lv.remove()
            this.scoreTrend.remove()
        }
    })

    return App
});