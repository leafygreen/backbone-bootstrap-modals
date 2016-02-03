// BaseBodyView
// ---------------------------------
//
// A simple view representing a minimal modal body

BackboneBootstrapModals.BaseBodyView = Backbone.View.extend({
    className: 'modal-body',

    initialize: function (opts) {
        var options = opts || {};
        this.text = options.text;
        this.textTagName = options.textTagName || 'p';
    },

    render: function() {
        var html;
        if (this.text) {
            if (_.isArray(this.text)) {
                html = _.map(this.text, _.bind(this.createTag, this));
            } else {
                html = this.createTag(this.text);
            }
            this.$el.html(html);
        }
        return this;
    },

    createTag: function(text) {
        var $tag = Backbone.$('<'+this.textTagName+'>').text(text);
        return $tag;
    }
});
