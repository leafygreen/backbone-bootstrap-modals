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
