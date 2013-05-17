
define(['underscore', 'backbone'], function (_, Backbone) {
    'use strict';
    var template = '<li class="leader-row"><%= name %>: <%= score %></li>'
    return Backbone.View.extend({
        events: {},

        tagName: 'ul',
        className: 'leaderboard',

        initialize: function () {
            this.listenTo(this.collection, 'sync', _.bind(this.render, this))
        },

        render: function () {
            var fragment = '',
                foundYou = false,
                you

            _.each(this.collection.head(3), function (r) {
                if (!foundYou) { foundYou = r.get('name') === 'You' }
                fragment += _.template(template, r.toJSON())
            })
            this.el.innerHTML = fragment

            if (!foundYou) {
                you = this.collection.find(function (leader) {
                    return leader.get('name') === 'You'
                })
                if (!!you) { this.el.innerHTML += _.template(template, you.toJSON()) }
            }
            return this
        }
    })
})