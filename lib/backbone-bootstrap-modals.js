/*!
  backbone-bootstrap-modals 0.1.0
  Licensed under the MIT license.
*/

(function (root) {

"use strict";

// Create Project Namespace
var BackboneBootstrapModals = {};

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
  
  // Handlers for Bootstrap Modal Events: http://getbootstrap.com/javascript/#modals
  bootstrapModalEvents: {
    'show.bs.modal': 'onShowBsModal',
    'shown.bs.modal': 'onShownBsModal',
    'hide.bs.modal': 'onHideBsModal',
    'hidden.bs.modal': 'onHiddenBsModal'
  },

  // The default views if not overridden or specified in options
  headerView: BackboneBootstrapModals.BaseHeaderView,
  bodyView: BackboneBootstrapModals.BaseBodyView,
  footerView: BackboneBootstrapModals.BaseFooterView,

  // The default modal options if not overridden or specified in options
  modalOptions: {
    backdrop: true,
    keyboard: true
  },

  initialize: function (opts) {
    var options = opts || {};
    this.shown = false;
    if (options.modalOptions) {
      this.modalOptions = options.modalOptions;
    }
    this.initializeSubviews(options);
  },

  // Initialize views for header, body, and footer sections.
  // All subviews should respect Bootstrap markup guidelines.
  initializeSubviews: function(options) {
    // Initialize headerView
    this.headerViewInstance = this.buildSubview(
      'headerView',
      'headerViewOptions',
      options);
    // Initialize bodyView
    this.bodyViewInstance = this.buildSubview(
      'bodyView',
      'bodyViewOptions',
      options);
    // Initialize footerView
    this.footerViewInstance = this.buildSubview(
      'footerView',
      'footerViewOptions',
      options);
  },

  // Default to using viewKey and viewOptionsKey already present on the view.
  // Otherwise, check to see if values were passed through options.
  buildSubview: function(viewKey, viewOptionsKey, options) {
    // Override any defined viewOptions with the one in options if present
    if (options[viewOptionsKey]) {
      this[viewOptionsKey] = options[viewOptionsKey];
    }
    // Override any defined view with the one in options if present
    if (options[viewKey]) {
      this[viewKey] = options[viewKey];
    }
    // Validate the view is present
    if (!this[viewKey]) {
      throw new Error(viewKey+" must be specified");
    }
    // Call the specified view constructor with the specified options, and
    // additionally the modal's model/collection attributes
    var viewOptions = _.extend({
      model: this.model,
      collection: this.collection
    }, this[viewOptionsKey]);
    return new this[viewKey](viewOptions);
  },

  // Override default implementation to always include bootstrapModalEvents
  delegateEvents: function(events) {
    var combinedEvents = events || _.result(this, 'events') || {};

    _.each(this.getAdditionalEventsToDelegate(), function(eventHash) {
      _.extend(combinedEvents, eventHash);
    });

    Backbone.View.prototype.delegateEvents.call(this, combinedEvents);
  },

  // Helper method for use in overridden delegateEvents call.
  // This can be overridden in extended classes if you want similiar
  // behavior of not clobbering the default events hash -- See ConfirmationModal.confirmationEvents
  getAdditionalEventsToDelegate: function() {
    return [this.bootstrapModalEvents];
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
    }

    return this;
  },

  remove: function () {
    this.removeSubviews();
    return Backbone.View.prototype.remove.apply(this, arguments);
  },

  removeSubviews: function() {
    if (this.headerView) { this.removeSubview(this.headerViewInstance); }
    if (this.bodyView) { this.removeSubview(this.bodyViewInstance);  }
    if (this.footerView) { this.removeSubview(this.footerViewInstance);  }
  },

  // Attempt to use Marionette's close first, falling back to Backbone's remove
  removeSubview: function(viewInstance) {
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
  onShowBsModal: function() {
  },

  // This event is fired when the modal has been made visible to the user (will wait for CSS transitions to complete). 
  onShownBsModal: function(e) {
      this.shown = true;
  },

  // This event is fired immediately when the hide instance method has been called.
  onHideBsModal: function() {
  },

  // This event is fired when the modal has finished being hidden from the user (will wait for CSS transitions to complete).
  onHiddenBsModal: function(e) {
    this.shown = false;
    this.remove();
  },

});

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
    var options = _.extend({}, this.defaultOptions, opts);
    if (options.headerViewOptions && options.label) {
        options.headerViewOptions.label = options.label;
    }
    if (options.bodyViewOptions && options.text) {
        options.bodyViewOptions.text = options.text;
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

// WizardModal
// ---------------------------------
//
// A simple modal for dialogs with multi-step wizard behavior

BackboneBootstrapModals.WizardModal = BackboneBootstrapModals.BaseModal.extend({

  wizardEvents: {
    'click #confirmation-previous-btn': 'onClickPrevious',
    'click #confirmation-next-btn': 'onClickNext'
  },

  initialize: function(opts) {
    this.initializeSteps(opts);
    this.setCurrentStep(0);
    
    // Create a custom set of options to pass to BaseModal
    var options = this.getOptionsForCurrentStep();
    options.modalOptions = opts.modalOptions;
    BackboneBootstrapModals.BaseModal.prototype.initialize.call(this, options);
  },

  initializeSteps: function(opts) {
    // Override any defined stepGraph with the one in options if present
    if (opts.stepGraph) {
      this.stepGraph = opts.stepGraph;
    }
    // Validate the steps structure
    if (!this.stepGraph || !_.isArray(this.stepGraph) || !this.stepGraph.length) {
      throw new Error("steps array must be specified and non-empty");
    }
  },

  setCurrentStep: function(index) {
    this.currentStep = this.stepGraph[index];
  },

  // Return BaseModal options for the current step
  getOptionsForCurrentStep: function() {
    var step = this.currentStep,
        buttons = this.getButtonsForCurrentStep();
    return {
      headerViewOptions: {
        label: step.label,
        labelId: 'myModalLabel',
        showClose: true,
      },
      bodyView: step.view,
      bodyViewOptions: step.viewOptions,
      footerViewOptions: {
        buttons: buttons
      }
    };
  },

  getButtonsForCurrentStep: function() {
    var previousStepIndex = this.currentStep.previousIndex,
        previousText = this.currentStep.previousText || 'Previous',
        nextStepIndex = this.currentStep.nextIndex,
        nextText = this.currentStep.nextText || 'Next',
        buttons = [];
    if (previousStepIndex !== undefined) {
      buttons.push({ id: 'confirmation-previous-btn',className: 'btn btn-default', value: previousText });
    }
    buttons.push({ id: 'confirmation-next-btn',className: 'btn btn-primary', value: nextText });
    return buttons;
  },

  // Override BaseModal hook to add additional default delegated events
  getAdditionalEventsToDelegate: function() {
    var eventHashes = BackboneBootstrapModals.BaseModal.prototype.getAdditionalEventsToDelegate.call(this);
    return eventHashes.concat(this.wizardEvents);
  },

  // Remove previous subviews and initialize subviews for the new step
  renderSubviews: function() {
    var options = this.getOptionsForCurrentStep();
    BackboneBootstrapModals.BaseModal.prototype.removeSubviews.call(this);
    BackboneBootstrapModals.BaseModal.prototype.initializeSubviews.call(this, options);
    this.render();
  },

  renderPreviousStep: function() {
    this.setCurrentStep(this.currentStep.previousIndex);
    this.renderSubviews();
  },

  renderNextStep: function() {
    var nextStepIndex = this.currentStep.nextIndex;
    if (nextStepIndex !== undefined) {
      this.setCurrentStep(nextStepIndex);
      this.renderSubviews();
    } else {
      // If no more steps, hide the dialog
      this.hide();
    }
  },

  onClickPrevious: function(e) {
    e.preventDefault();
    e.currentTarget.disabled = true;
    this.renderPreviousStep();
  },

  onClickNext: function(e) {
    e.preventDefault();
    e.currentTarget.disabled = true;

    // Execute the specified callback if it exists, then proceed.
    // The modal will not proceed if the callback returns false.
    if (this.currentStep.onNext) {
        if (this.currentStep.onNext.call(this) === false) {
            return;
        }
    }

    this.renderNextStep();
  }
});

root.BackboneBootstrapModals = BackboneBootstrapModals;

}(this));