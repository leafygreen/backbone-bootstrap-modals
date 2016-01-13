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

  // properties to copy from options
  modalProperties: [
    'modalOptions',
    'headerView',
    'headerViewOptions',
    'bodyView',
    'bodyViewOptions',
    'footerView',
    'footerViewOptions'
  ],

  constructor: function(opts) {
    var options = opts || {};
    this.shown = false;
    _.extend(this, _.pick(options, this.modalProperties));
    Backbone.View.prototype.constructor.apply(this, arguments);
  },

  render: function() {
    // Remove any existing views before appending subviews to the layout
    this.removeSubviews();
    this.initializeSubviews();

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

    // Allow onRender callback for custom hooks
    if (this.onRender) { this.onRender.call(this); }

    if (!this.shown && this.modalOptions.show !== false) {
        this.$el.modal(this.modalOptions);
    }

    return this;
  },

  // Initialize views for header, body, and footer sections.
  initializeSubviews: function() {
    this.headerViewInstance = this.buildSubview(
      this.getHeaderView(),
      _.result(this, 'headerViewOptions'),
      'modal-header');
    
    this.bodyViewInstance = this.buildSubview(
      this.getBodyView(),
      _.result(this, 'bodyViewOptions'),
      'modal-body');
    
    this.footerViewInstance = this.buildSubview(
      this.getFooterView(),
      _.result(this, 'footerViewOptions'),
      'modal-footer');
  },

  // Accessors that can be overridden to allow dynamic subview definitions
  getHeaderView: function() {
    return this.headerView;
  },

  getBodyView: function() {
    return this.bodyView;
  },

  getFooterView: function() {
    return this.footerView;
  },

  // Construct view instance with specified options and
  // additionally propagate model/collection/className attributes
  buildSubview: function(viewClass, viewOptions, defaultClassName) {
    if (!viewClass) {
      throw new Error("view not specified");
    }
    
    var options = _.extend({
      model: this.model,
      collection: this.collection
    }, viewOptions);

    // Ensure the proper className if not specified through the viewClass or viewOptions 
    if (!(viewClass.prototype.className || options.className)) {
      options.className = defaultClassName;
    }

    return new viewClass(options);
  },

  remove: function () {
    this.removeSubviews();
    Backbone.View.prototype.remove.apply(this, arguments);

    // Allow onClose callback for custom hooks
    if (this.onClose) { this.onClose.call(this); }

    return this;
  },

  removeSubviews: function() {
    if (this.headerViewInstance) { this.removeSubview(this.headerViewInstance); }
    if (this.bodyViewInstance) { this.removeSubview(this.bodyViewInstance);  }
    if (this.footerViewInstance) { this.removeSubview(this.footerViewInstance);  }
  },

  // Attempt to use Marionette's destroy first, falling back to Backbone's remove
  removeSubview: function(viewInstance) {
    if (Backbone.Marionette && viewInstance.destroy) {
        viewInstance.destroy.apply(viewInstance);
    } else if (viewInstance.remove) {
        viewInstance.remove.apply(viewInstance);
    }
  },

  // Override default implementation to always include bootstrapModalEvents
  // without clobbering the default events hash
  delegateEvents: function(events) {
    var combinedEvents = events || _.result(this, 'events') || {};

    _.each(this.getAdditionalEventsToDelegate(), function(eventHash) {
      _.extend(combinedEvents, eventHash);
    });

    Backbone.View.prototype.delegateEvents.call(this, combinedEvents);
  },

  // Helper method for use in overridden delegateEvents call.
  // This can be overridden in extended classes to provide additional
  // events, e.g. ConfirmationModal.confirmationEvents
  getAdditionalEventsToDelegate: function() {
    return [this.bootstrapModalEvents];
  },

  show: function() {
    this.$el.modal('show');
  },

  hide: function() {
    this.$el.modal('hide');
  },

  // This event fires immediately when the show instance method is called.
  onShowBsModal: function() {
    if (this.onShow) { this.onShow.call(this); }
  },

  // This event is fired when the modal has been made visible to the user (will wait for CSS transitions to complete). 
  onShownBsModal: function() {
      this.shown = true;
      if (this.onShown) { this.onShown.call(this); }
  },

  // This event is fired immediately when the hide instance method has been called.
  onHideBsModal: function() {
    if (this.onHide) { this.onHide.call(this); }
  },

  // This event is fired when the modal has finished being hidden from the user (will wait for CSS transitions to complete).
  onHiddenBsModal: function() {
    this.shown = false;
    this.remove();
    if (this.onHidden) { this.onHidden.call(this); }
  },

});
