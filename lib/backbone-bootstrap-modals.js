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

  // The modal options that will be used if none are passed as options to the constructor
  defaultModalOptions: {
    backdrop: true,
    keyboard: true
  },

  initialize: function (opts) {
    var options = opts || {};
    this.initializeSubViews(options);
    this.modalOptions = _.extend({}, this.defaultModalOptions, options.modalOptions);
    this.shown = false;
  },

  // Initialize views for header, body, and footer sections.
  // All sub views should respect Bootstrap markup guidelines.
  initializeSubViews: function(options) {
    // Initialize headerView
    this.initializeSubView(
      'headerViewInstance',
      'headerView',
      'headerViewOptions',
      BackboneBootstrapModals.BaseHeaderView,
      options);
    // Initialize bodyView
    this.initializeSubView(
      'bodyViewInstance',
      'bodyView',
      'bodyViewOptions',
      BackboneBootstrapModals.BaseBodyView,
      options);
    // Initialize footerView
    this.initializeSubView(
      'footerViewInstance',
      'footerView',
      'footerViewOptions',
      BackboneBootstrapModals.BaseFooterView,
      options);
  },

  // Default to using viewKey and viewOptionsKey already present on the view.
  // Otherwise, check to see if values were passed through options.
  // If no options specified, use default views for basic functionality.
  initializeSubView: function(instanceKey, viewKey, viewOptionsKey, defaultView, options) {
    if (!this[viewOptionsKey]) {
      this[viewOptionsKey] = options[viewOptionsKey];
    }
    if (!this[viewKey]) {
      if (options[viewKey]) {
        this[viewKey] = options[viewKey];
      } else {
        this[viewKey] = defaultView;
      }
    }
    // Call the specified view constructor with the specified options
    this[instanceKey] = new this[viewKey](this[viewOptionsKey]);
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
      $modalContent.append(this.headerViewInstance.render().$el);
    }

    if (this.bodyView) {
      $modalContent.append(this.bodyViewInstance.render().$el);
    }

    if (this.footerView) {
      $modalContent.append(this.footerViewInstance.render().$el);
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
    if (this.headerView) { this.removeSubView(this.headerViewInstance); }
    if (this.bodyView) { this.removeSubView(this.bodyViewInstance);  }
    if (this.footerView) { this.removeSubView(this.footerViewInstance);  }
  },

  // Attempt to use Marionette's close first, falling back to Backbone's remove
  removeSubView: function(viewInstance) {
    if (Backbone.Marionette && viewInstance.close) {
        viewInstance.close.apply(viewInstance);
    } else if (viewInstance.remove) {
        viewInstance.remove.apply(viewInstance);
    }
  },

  show: function() {
    this.$el.modal('show');
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
    this.initializeSteps(opts);
    this.setCurrentStep(0);
    var options = this.getOptionsForCurrentStep();
    options.modalOptions = _.extend({}, this.defaultModalOptions, opts.modalOptions);
    BackboneBootstrapModals.BaseModal.prototype.initialize.call(this, options);
  },

  initializeSteps: function(opts) {
    // if the steps structure is not already present, look in options
    if (!this.steps) {
      this.steps = opts.steps;
    }
    // Validate the steps structure
    if (!opts.steps || !_.isArray(opts.steps) || !opts.steps.length) {
      throw new Error("steps array must be specified and non-empty");
    }
  },

  setCurrentStep: function(index) {
    this.currentStepIndex = index;
    this.currentStep = this.steps[this.currentStepIndex];
  },

  getPreviousStepIndex: function() {
    var prev = this.currentStepIndex - 1;
    if (prev >= 0) {
      return prev;
    }
  },

  getNextStepIndex: function() {
    return this.currentStepIndex + 1;
  },

  // Return BaseModal options for the current step
  getOptionsForCurrentStep: function() {
    return {
      headerViewOptions: {
        label: this.currentStep.label,
        labelId: 'myModalLabel',
        showClose: true,
      },
      bodyView: this.currentStep.view,
      bodyViewOptions: this.currentStep.viewOptions,
      footerViewOptions: {
        buttons: this.getButtonsForCurrentStep()
      }
    };
  },

  getButtonsForCurrentStep: function() {
    var previousText = this.currentStep.previousText || 'Previous',
        nextText = this.currentStep.nextText || 'Next',
        previousStepIndex = this.getPreviousStepIndex(),
        nextStepIndex = this.getNextStepIndex(),
        buttons = [];
    if (previousStepIndex) {
      buttons.push({ id: 'confirmation-previous-btn',className: 'btn btn-default', value: previousText });
    }
    if (nextStepIndex) {
      buttons.push({ id: 'confirmation-next-btn',className: 'btn btn-primary', value: nextText });
    }
    return buttons;
  },

  onClickPrevious: function(e) {
    e.preventDefault();
    e.currentTarget.disabled = true;
    this.setCurrentStep(this.getPreviousStepIndex());
    this.renderCurrentStep();
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

    var nextStepIndex = this.getNextStepIndex();
    if (nextStepIndex > this.steps.length) {
      // If no more steps, hide the dialog
      this.hide();
    } else {
      this.setCurrentStep(nextStepIndex);
      this.renderCurrentStep();
    }
  },

  // Remove Previous sub views and initialize sub views for the new step
  renderCurrentStep: function() {
    var options = this.getOptionsForCurrentStep();
    BackboneBootstrapModals.BaseModal.prototype.removeSubViews.call(this);
    BackboneBootstrapModals.BaseModal.prototype.initializeSubViews.call(this, options);
    this.render();
  }
});

root.BackboneBootstrapModals = BackboneBootstrapModals;

}(this));