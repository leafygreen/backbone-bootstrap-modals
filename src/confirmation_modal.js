// ConfirmationModal
// ---------------------------------
//
// A simple modal for simple confirmation dialogs

BackboneBootstrapModals.ConfirmationModal = BackboneBootstrapModals.BaseModal.extend({

  events: {
    'click #confirmation-cancel-btn': 'onClickCancel',
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
    var options = _.extend({}, this.defaultOptions, opts);
    if (options.headerViewOptions && options.label) {
        options.headerViewOptions.label = options.label;
    }
    if (options.bodyViewOptions && options.text) {
        options.bodyViewOptions.text = options.text;
    }

    this.onCancel = options.onCancel;
    this.onConfirm = options.onConfirm;
    BackboneBootstrapModals.BaseModal.prototype.initialize.call(this, options);
  },

  onClickCancel: function(e) {
    e.preventDefault();
    e.currentTarget.disabled = true;
    this.executeCallbackAndHide(this.onConfirm);
  },

  onClickConfirm: function(e) {
    e.preventDefault();
    e.currentTarget.disabled = true;
    this.executeCallbackAndHide(this.onConfirm);
  },

  // Execute the specified callback if it exists, then hide the modal.
  // The modal will not be hidden if the callback returns false.
  executeCallbackAndHide: function(callback) {
    if (callback) {
        if (callback.call() !== false) {
            this.hide();
        }
    } else {
        this.hide();
    }
  }
});
