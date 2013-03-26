!(function (factory) {
  if (typeof module !== 'undefined' && typeof module.exports === 'object')
    module.exports = factory(require('underscore'), require('backbone'))
  else if (typeof define === 'function' && define.amd) define(['underscore', 'backbone'], factory)
  else this['GA'] = factory(this['_'], this['Backbone'])
} (function (_, Backbone) {
    var GA = function (account) {
            this._gaq = window._gaq || (window._gaq = [])
            if (account) this.setAccount(account)
        }

    _.extend(GA.prototype, Backbone.Events, {
        setAccount: function (account) {
            _gaq.push(['_setAccount', account])
        },
        trackPageView: function () {
            _gaq.push(['_trackPageview'])
        },
        trackEvent: function (category, action, label) {
            _gaq.push(['_trackEvent', category, action, label])
        }
    })

    return GA
}))