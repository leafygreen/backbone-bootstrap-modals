// ConfirmationModal
// ---------------------------------
//
// A simple modal for simple confirmation dialogs

BackboneBootstrapModals.ConfirmationModal = BackboneBootstrapModals.BaseModal.extend({

  confirmationEvents: {
    'click #confirmation-confirm-btn': 'onClickConfirm'
  },

  // Default set of BaseModal options for use as ConfirmationModal
  defaultOptions: {
    headerViewOptions: {
        label: undefined,
        labelId: 'myModalLabel',
        showClose: true,
      },
      bodyViewOptions: {
        text: undefined
      },
      footerViewOptions: {
        buttons: [
          { id: 'confirmation-cancel-btn', className: 'btn btn-default', value: 'Cancel', attributes: { 'data-dismiss': 'modal', 'aria-hidden': 'true' }},
          { id: 'confirmation-confirm-btn',className: 'btn btn-primary', value: 'Confirm' }
        ]
      }
  },

  initialize: function(opts) {
    var options = _.extend({}, this.defaultOptions, opts),
        label = options.label || this.label,
        text = options.text || this.text;
    if (options.headerViewOptions && label) {
        options.headerViewOptions.label = label;
    }
    if (options.bodyViewOptions && options.text) {
        options.bodyViewOptions.text = text;
    }
    if (options.onConfirm) {
      this.onConfirm = options.onConfirm;
    }
    BackboneBootstrapModals.BaseModal.prototype.initialize.call(this, options);
  },

  // Override BaseModal hook to add additional default delegated events
  getAdditionalEventsToDelegate: function() {
    var eventHashes = BackboneBootstrapModals.BaseModal.prototype.getAdditionalEventsToDelegate.call(this);
    return eventHashes.concat(this.confirmationEvents);
  },

  onClickConfirm: function(e) {
    e.preventDefault();
    e.currentTarget.disabled = true;

    // Execute the specified callback if it exists, then hide the modal.
    // The modal will not be hidden if the callback returns false.
    if (this.onConfirm) {
        if (this.onConfirm.call(this) !== false) {
            this.hide();
        }
    } else {
        this.hide();
    }
  }
});
