define(['underscore', 'backbone'], function (_, Backbone) {
    'use strict';

    return Backbone.View.extend({
        events: {
            'click .log-activity': 'showActivityForm',
            'click .log': 'claimAccomplishment',
            'click .cancel': 'hideActivityForm'
        },

        initialize: function () {
            //
        },

        showActivityForm: function (evt) {

            var $logActivityButton = Backbone.$(evt.target),
                challengeId = $logActivityButton.closest('.challenge').data('challenge-id'),
                $logDetails = $logActivityButton.siblings('.log-details')
            this._toggleView(evt, $logActivityButton, $logDetails)
            $logDetails.find('textarea').focus()
            this.trigger('prepare-to-log', challengeId)

        },

        hideActivityForm: function (evt) {

            var $target = Backbone.$(evt.target),
                $logDetails = $target.closest('.log-details'),
                challengeId = $logDetails.closest('.challenge').data('challenge-id'),
                $logActivityButton = $logDetails.siblings('.log-activity')
            $logDetails.find('textarea').val('')
            this._toggleView(evt, $logActivityButton, $logDetails)
            this.trigger('canceled-logging', challengeId)

        },

        _toggleView: function (evt, $logActivityButton, $logDetails) {

            evt.preventDefault()
            $logActivityButton.toggleClass('inactive')
            $logDetails.toggleClass('active')

        },

        claimAccomplishment: function (evt) {

            var $target = Backbone.$(evt.target),
                $logDetails = $target.closest('.log-details'),
                challengeId = $logDetails.closest('.challenge').data('challenge-id'),
                msg = $logDetails.find('textarea').val(),
                $logActivityButton = $logDetails.siblings('.log-activity')
            $logDetails.hide()
            $logActivityButton.hide()
            this.trigger('logged-activity', challengeId, msg)
            this._saveAccomplishment(challengeId, msg)

        },

        _saveAccomplishment: function (challengeId, msg) {
            // consider using an Accomplishment model
            /*Backbone.ajax({
                url: '/accomplishments',
                type: 'POST',
                data: {
                    challengeId: challengeId,
                    message: msg
                }
            }).then(function (response) {}, function (error) {})*/
            
            // assume the AJAX call succeeded and responded with
            // an HTML partial
            this.$el
            .find('[data-challenge-id=' + challengeId + ']')
            .append('<p>' + msg + '</p>')
        }
    })
})