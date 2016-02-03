// ConfirmationModal
// ---------------------------------
//
// A simple modal for simple confirmation dialogs

BackboneBootstrapModals.ConfirmationModal = BackboneBootstrapModals.BaseModal.extend({

    confirmationEvents: {
        'click #confirmation-confirm-btn': 'onClickConfirm',
        'keypress .modal-body': 'onKeyPress'
    },

    // Default set of BaseModal options for use as ConfirmationModal
    headerViewOptions: function() {
        return {
            label: _.result(this, 'label'),
            labelId: _.result(this, 'labelId'),
            labelTagName: _.result(this, 'labelTagName'),
            showClose: _.result(this, 'showClose')
        };
    },

    bodyViewOptions: function() {
        return {
            text: _.result(this, 'text'),
            textTagName: _.result(this, 'textTagName')
        };
    },

    footerViewOptions: function() {
        var buttons = [],
            showCancel = _.result(this, 'showCancel');
        if (showCancel === undefined || showCancel === true) {
            buttons.push({
                id: 'confirmation-cancel-btn',
                className: 'btn '+ (_.result(this, 'cancelClassName') || 'btn-default'),
                value: (_.result(this, 'cancelText') || 'Cancel'),
                attributes: { 'data-dismiss': 'modal', 'aria-hidden': 'true' }
          });
        }
        buttons.push({
            id: 'confirmation-confirm-btn',
            className: 'btn '+ (_.result(this, 'confirmClassName') || 'btn-primary'),
            value: (_.result(this, 'confirmText') || 'Confirm')
        });
        return {
            buttons: buttons
        };
    },

    // properties to copy from options
    confirmationProperties: [
        'label',
        'labelId',
        'labelTagName',
        'showClose',
        'text',
        'textTagName',
        'confirmText',
        'confirmClassName',
        'cancelText',
        'cancelClassName',
        'showCancel',
        'onConfirm',
        'onCancel'
    ],

    initialize: function(opts) {
        var options = opts || {};
        _.extend(this, _.pick(options, this.confirmationProperties));
    },

    // Override BaseModal hook to add additional default delegated events
    getAdditionalEventsToDelegate: function() {
        var eventHashes = BackboneBootstrapModals.BaseModal.prototype.getAdditionalEventsToDelegate.call(this);
        return eventHashes.concat(this.confirmationEvents);
    },

    onKeyPress: function(e) {
        // if the user presses the enter key
        if (e.which === 13) {
            e.preventDefault();
            this.$('#confirmation-confirm-btn').click();
        }
    },

    onClickConfirm: function(e) {
        e.preventDefault();
        e.currentTarget.disabled = true;
        this.confirmProgress(e);
    },

    confirmProgress: function(e) {
        this.isConfirmed = true;

        // Execute the specified callback if it exists, then hide the modal.
        // The modal will not be hidden if the callback returns false.
        if (this.onConfirm) {
            if (this.onConfirm(e) !== false) {
                this.hide();
            }
        } else {
            this.hide();
        }
    },

    onHideBsModal: function() {
        if (!this.isConfirmed) {
            if (this.onCancel) {
                this.onCancel();
            }
        }

        BackboneBootstrapModals.BaseModal.prototype.onHideBsModal.call(this);
    }
});
