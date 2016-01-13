// BaseFooterView
// ---------------------------------
//
// A simple view representing a set of modal action buttons

BackboneBootstrapModals.BaseFooterView = Backbone.View.extend({
  className: 'modal-footer',

  initialize: function (opts) {
    var options = opts || {};
    this.buttons = options.buttons || [];
  },

  render: function() {
    function createButton(button) {
      var $btn = Backbone.$('<button>', _.extend({
        'id': button.id,
        'class': button.className
      }, button.attributes)).text(button.value);
      return $btn;
    }

    this.$el.html(this.buttons.map(createButton));
    return this;
  }

});
