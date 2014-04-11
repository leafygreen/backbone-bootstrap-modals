/*!
  backbone-bootstrap-modals 0.1.0
  Licensed under the MIT license.
*/

(function (root) {

"use strict";

// Create Project Namespace
var BackboneBootstrapModals = {};

// BaseModal
// ---------------------------------
//
// The base class all other modals extend.

BackboneBootstrapModals.BaseModal = Backbone.View.extend({
  className: 'modal',
  attributes: {
    'tabindex': '-1',
    'role': 'dialog',
    'aria-labelledby': 'myModalLabel'
  },
  
  // Register Handlers for Bootstrap Modal Events: http://getbootstrap.com/javascript/#modals
  events: {
    'show.bs.modal': 'onShowBsModal',
    'shown.bs.modal': 'onShownBsModal',
    'hide.bs.modal': 'onHideBsModal',
    'hidden.bs.modal': 'onHiddenBsModal'
  },

  defaultModalOptions: {
    backdrop: true,
    keyboard: true
  },

  initialize: function (opts) {
    var options = opts || {};
    this.initializeSubViews(options);
    this.shown = false;
  },

  // Initialize views for header, body, and footer sections.
  // If a view property is not passed as an option, a default view will be used.
  // Additional option properties may be passed in if using the default views.
  // All sub views should respect Bootstrap markup guidelines.
  initializeSubViews: function(options) {
    this.headerView = (options.headerView) ? options.headerView : new BackboneBootstrapModals.BaseHeaderView(options.headerViewOptions);
    this.bodyView = (options.bodyView) ? options.bodyView : new BackboneBootstrapModals.BaseBodyView(options.bodyViewOptions);
    this.footerView = (options.footerView) ? options.footerView : new BackboneBootstrapModals.BaseFooterView(options.footerViewOptions);
    this.modalOptions = _.extend({}, this.defaultModalOptions, options.modalOptions);
  },

  render: function() {
    this.$el.html([
      '<div class="modal-dialog">',
      '<div class="modal-content">',
      '</div>',
      '</div>'
    ].join(''));

    var $modalContent = this.$el.find('.modal-content');

    if (this.headerView) {
      $modalContent.append(this.headerView.render().$el);
    }

    if (this.bodyView) {
      $modalContent.append(this.bodyView.render().$el);
    }

    if (this.footerView) {
      $modalContent.append(this.footerView.render().$el);
    }

    if (!this.shown && this.modalOptions.show !== false) {
        this.$el.modal(this.modalOptions);
        this.shown = true;
    }

    return this;
  },

  remove: function () {
    this.removeSubViews();
    return Backbone.View.prototype.remove.apply(this, arguments);
  },

  removeSubViews: function() {
    if (this.headerView) { this.removeSubView(this.headerView); }
    if (this.bodyView) { this.removeSubView(this.bodyView);  }
    if (this.footerView) { this.removeSubView(this.footerView);  }
  },

  // Attempt to use Marionette's close first, falling back to Backbone's remove
  removeSubView: function(view) {
    if (Backbone.Marionette && view.close) {
        view.close.apply(view);
    } else if (view.remove) {
        view.remove.apply(view);
    }
  },

  hide: function() {
    this.$el.modal('hide');
  },

  // This event fires immediately when the show instance method is called.
  onShowBsModal: function(e) {
  },

  // This event is fired when the modal has been made visible to the user (will wait for CSS transitions to complete). 
  onShownBsModal: function(e) {
  },

  // This event is fired immediately when the hide instance method has been called.
  onHideBsModal: function(e) {
  },

  // This event is fired when the modal has finished being hidden from the user (will wait for CSS transitions to complete).
  onHiddenBsModal: function(e) {
    this.remove();
  },

});

// BaseHeaderView
// ---------------------------------
//
// A simple view representing the modal title and dismiss icon.

BackboneBootstrapModals.BaseHeaderView = Backbone.View.extend({
  className: 'modal-header',

  initialize: function (opts) {
    var options = opts || {};
    this.label = options.label || '';
    this.labelId = options.labelId || 'myModalLabel';
    this.showClose = (options.showClose !== undefined) ? options.showClose : true;
  },

  render: function() {
    var html = '';
    if (this.showClose) {
      html += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>';
    }
    html += '<h4 id="'+this.labelId+'" class="modal-title">'+this.label+'</h4>';
    this.$el.html(html);
    return this;
  }

});

// BaseBodyView
// ---------------------------------
//
// A simple view representing a minimal modal body

BackboneBootstrapModals.BaseBodyView = Backbone.View.extend({
  className: 'modal-body',

  initialize: function (opts) {
    var options = opts || {};
    this.text = options.text;
  },

  render: function() {
    var html = "";
    if (this.text) {
      html += '<p>'+this.text+'</p>';
    }
    this.$el.html(html);
    return this;
  }

});

// BaseFooterView
// ---------------------------------
//
// A simple view representing a set of modal action buttons

BackboneBootstrapModals.BaseFooterView = Backbone.View.extend({
  className: 'modal-footer',

  initialize: function (opts) {
    var options = opts || {};
    this.buttons = options.buttons || [];
  },

  render: function() {
    function createButton(button) {
      var attrs = button.attributes || {},
          attributes = Object.keys(attrs).map(function(key) {
            return key+'="'+attrs[key]+'"';
          }).join(' ');

      var btn = '<button';
      if (button.id) { btn += ' id="'+button.id+'"'; }
      if (button.className) { btn += ' class="'+button.className+'"'; }
      if (attributes) { btn += attributes ;}
      btn += '>';
      if (button.value) { btn += button.value; }
      btn += '</button>';
      return btn;
    }

    var html = this.buttons.map(createButton).join('');
    this.$el.html(html);
    return this;
  }

});

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

// WizardModal
// ---------------------------------
//
// A simple modal for dialogs with multi-step wizard behavior

BackboneBootstrapModals.WizardModal = BackboneBootstrapModals.BaseModal.extend({

  events: {
    'click #confirmation-previous-btn': 'onClickPrevious',
    'click #confirmation-next-btn': 'onClickNext'
  },

  initialize: function(opts) {
    if (!opts.steps || !_.isArray(opts.steps) || !opts.steps.length) {
      throw new Error("steps array must be specified and non-empty");
    }
    this.stepIndex = 0;
    this.steps = opts.steps;

    var options = this.getOptionsForStep(this.stepIndex);
    options.modalOptions = _.extend({}, this.defaultModalOptions, opts.modalOptions);
    BackboneBootstrapModals.BaseModal.prototype.initialize.call(this, options);
  },

  // Return BaseModal options for the current step index
  getOptionsForStep: function(index) {
    var step = this.steps[index];
    return {
      headerViewOptions: {
        label: step.label,
        labelId: 'myModalLabel',
        showClose: true,
      },
      bodyView: new step.view(step.viewOptions),
      footerViewOptions: {
        buttons: this.getButtonsForStep(index)
      }
    };
  },

  getButtonsForStep: function(index) {
    var step = this.steps[index],
        previousText = step.previousText || 'Previous',
        nextText = step.nextText || 'Next';
    if (index === 0) {
      return [
        { id: 'confirmation-next-btn',className: 'btn btn-primary', value: nextText }
      ];
    } else {
      return [
        { id: 'confirmation-previous-btn',className: 'btn btn-default', value: previousText },
        { id: 'confirmation-next-btn',className: 'btn btn-primary', value: nextText }
      ];
    }
  },

  onClickPrevious: function(e) {
    e.preventDefault();
    e.currentTarget.disabled = true;
    this.stepIndex -= 1;
    this.renderStep();
  },

  onClickNext: function(e) {
    e.preventDefault();
    e.currentTarget.disabled = true;

    // Execute the specified callback if it exists, then proceed.
    // The modal will not proceed if the callback returns false.
    if (this.onNext) {
        if (this.onNext.call() === false) {
            return;
        }
    }

    if (this.stepIndex === this.steps.length-1) {
      this.hide();
    } else {
      this.stepIndex += 1;
      this.renderStep();
    }
  },

  // Remove Previous sub views and initialize sub views for the new step
  renderStep: function() {
    var options = this.getOptionsForStep(this.stepIndex);
    BackboneBootstrapModals.BaseModal.prototype.removeSubViews.call(this);
    BackboneBootstrapModals.BaseModal.prototype.initializeSubViews.call(this, options);
    this.render();
  }
});

root.BackboneBootstrapModals = BackboneBootstrapModals;

}(this));