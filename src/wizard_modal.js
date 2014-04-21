// WizardModal
// ---------------------------------
//
// A simple modal for dialogs with multi-step wizard behavior

BackboneBootstrapModals.WizardModal = BackboneBootstrapModals.BaseModal.extend({

  wizardEvents: {
    'click #confirmation-previous-btn': 'onClickPrevious',
    'click #confirmation-next-btn': 'onClickNext'
  },

  getBodyView: function(options) {
    return this.currentStep.view;
  },

  headerViewOptions: function() {
    return {
      label: this.currentStep.label,
      labelId: 'myModalLabel',
      showClose: true
    };
  },

  bodyViewOptions: function() {
    return this.currentStep.viewOptions;
  },

  footerViewOptions: function() {
    var buttons = this.getButtonsForCurrentStep();
    return {
      buttons: buttons
    };
  },

  initialize: function(opts) {
    this.initializeSteps(opts);
    this.setCurrentStep(0); // always start with the first element
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

  getButtonsForCurrentStep: function() {
    var previousStepIndex = this.currentStep.previousIndex,
        previousText = this.currentStep.previousText || 'Previous',
        previousClassName = this.currentStep.previousClassName || 'btn-default',
        nextStepIndex = this.currentStep.nextIndex,
        nextText = this.currentStep.nextText || 'Next',
        nextClassName = this.currentStep.nextClassName || 'btn-primary',
        buttons = [];
    if (previousStepIndex !== undefined) {
      buttons.push({ id: 'confirmation-previous-btn', className: 'btn '+previousClassName, value: previousText });
    }
    buttons.push({ id: 'confirmation-next-btn', className: 'btn '+nextClassName, value: nextText });
    return buttons;
  },

  // Override BaseModal hook to add additional default delegated events
  getAdditionalEventsToDelegate: function() {
    var eventHashes = BackboneBootstrapModals.BaseModal.prototype.getAdditionalEventsToDelegate.call(this);
    return eventHashes.concat(this.wizardEvents);
  },

  renderPreviousStep: function() {
    this.setCurrentStep(this.currentStep.previousIndex);
    this.render();
  },

  renderNextStep: function() {
    var nextStepIndex = this.currentStep.nextIndex;
    if (nextStepIndex !== undefined) {
      this.setCurrentStep(nextStepIndex);
      this.render();
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
        if (this.currentStep.onNext.call(this, e) === false) {
            return;
        }
    }

    this.renderNextStep();
  }
});
