define(['backbone'], function (Backbone) {
    var Leader = Backbone.Model.extend({
            defaults: {
                name: 'Name',
                score: 0
            }
        }),
        yourScore = 35

    return Backbone.Collection.extend({
        model: Leader,

        comparator: function (model) {
            return -model.get('score')
        },

        sync: function (method, model, options) {
            options.success([{
                name: 'Adam',
                score: 55
            }, {
                name: 'Blake',
                score: 42
            }, {
                name: 'Caity',
                score: 39
            }, {
                name: 'You',
                score: (yourScore += 3)
            }])
        }
    })
})