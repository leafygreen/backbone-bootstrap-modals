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
    this.labelTagName = options.labelTagName || 'h4';
    this.showClose = (options.showClose !== undefined) ? options.showClose : true;
  },

  render: function() {
    var $header = $('<'+this.labelTagName+'>', {
      'id': this.labelId,
      'class': 'modal-title'
    }).text(this.label);

    var $close;
    if (this.showClose) {
      $close = $('<button>', {
        'type': 'button',
        'class': 'close',
        'data-dismiss': 'modal',
        'aria-hidden': 'true'
      }).html('&times;');
    }
    this.$el.html([$close, $header]);
    return this;
  }

});
