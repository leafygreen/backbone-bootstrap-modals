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
