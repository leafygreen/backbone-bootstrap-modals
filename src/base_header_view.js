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
