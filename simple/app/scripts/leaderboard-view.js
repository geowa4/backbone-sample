define(['underscore', 'backbone', 'leaderboard'], function (_, Backbone, Leaderboard) {
    var template = '<li class="leader-row"><%= name %>: <%= score %></li>'
    return Backbone.View.extend({
        events: {},

        tagName: 'ul',
        className: 'leaderboard',

        initialize: function () {
            var leaderboard = this.leaderboard = new Leaderboard()
            this.listenTo(leaderboard, 'sync', _.bind(this.render, this))
            leaderboard.fetch()
        },

        update: function () {
            this.leaderboard.fetch()
        },

        render: function () {
            var fragment = '',
                foundYou = false,
                you

            _.each(this.leaderboard.head(3), function (r) {
                if (!foundYou) foundYou = r.get('name') === 'You'
                fragment += _.template(template, r.toJSON())
            })
            this.el.innerHTML = fragment

            if (!foundYou) {
                you = this.leaderboard.find(function (leader) {
                    return leader.get('name') === 'You'
                })
                this.el.innerHTML += _.template(template, you.toJSON())
            }
            return this
        }
    })
})