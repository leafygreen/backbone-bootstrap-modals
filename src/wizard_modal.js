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
    this.setCurrentStep(0); // always start with the first element
    
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
