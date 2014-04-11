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
    if (!this.steps) {
      this.steps = opts.steps;
    }

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
