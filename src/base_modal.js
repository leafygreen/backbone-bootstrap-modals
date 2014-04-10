// BackboneBootstrapModals.BaseModal
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

    if (!this.shown) {
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
    if (this.headerView) { this.headerView.remove.apply(this.headerView, arguments); }
    if (this.bodyView) { this.bodyView.remove.apply(this.bodyView, arguments); }
    if (this.footerView) { this.footerView.remove.apply(this.footerView, arguments); }
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
