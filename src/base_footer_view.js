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
      var attrs = button.attributes || {},
          attributes = Object.keys(attrs).map(function(key) {
            return key+'="'+attrs[key]+'"';
          }).join(' ');

      var btn = '<button';
      if (button.id) { btn += ' id="'+button.id+'"'; }
      if (button.className) { btn += ' class="'+button.className+'"'; }
      if (attributes) { btn += attributes ;}
      btn += '>';
      if (button.value) { btn += button.value; }
      btn += '</button>';
      return btn;
    }

    var html = this.buttons.map(createButton).join('');
    this.$el.html(html);
    return this;
  }

});
