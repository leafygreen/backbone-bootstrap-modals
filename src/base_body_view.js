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
    var html;
    if (this.text) {
      if (_.isArray(this.text)) {
        html = _.map(this.text, this.createTag);
      } else {
        html = this.createTag(this.text);
      }
      this.$el.html(html);
    }
    return this;
  },

  createTag: function(text) {
    var $tag = $('<p>').text(text);
    return $tag;
  }

});
