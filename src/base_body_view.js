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
