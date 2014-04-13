/* global describe, it */

(function () {
  'use strict';

  describe('BaseModal', function () {
    describe('with no options', function () {
      var modal = new BackboneBootstrapModals.BaseModal({
        modalOptions: {
          show: false
        }
      });

      it('should render default markup', function () {
        modal.render();
        assert.equal('<div tabindex="-1" role="dialog" aria-labelledby="myModalLabel" class="modal">'+
                       '<div class="modal-dialog">'+
                         '<div class="modal-content">'+
                           '<div class="modal-header">'+
                             '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>'+
                             '<h4 id="myModalLabel" class="modal-title"></h4>'+
                           '</div>'+
                           '<div class="modal-body"></div>'+
                           '<div class="modal-footer"></div>'+
                         '</div>'+
                       '</div>'+
                     '</div>',
                     modal.el.outerHTML);
      });
    });

    describe('with basic options', function () {
      var modal = new BackboneBootstrapModals.BaseModal({
        headerViewOptions: {
          label: 'Example Dialog',
          labelId: 'exampleModalLabel'
        },
        bodyViewOptions: {
          text: 'This is an example body.'
        },
        footerViewOptions: {
          buttons: [
            { className: 'btn btn-default', value: 'Cancel', attributes: { 'data-dismiss': 'modal', 'aria-hidden': 'true' }},
            { id: 'simple-modal-apply-btn', className: 'btn btn-primary', value: 'Apply' }
          ]
        },
        modalOptions: {
          show: false
        }
      });

      it('should render default markup', function () {
        modal.render();
        assert.equal('<div tabindex="-1" role="dialog" aria-labelledby="myModalLabel" class="modal">'+
                       '<div class="modal-dialog">'+
                         '<div class="modal-content">'+
                           '<div class="modal-header">'+
                             '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>'+
                             '<h4 id="exampleModalLabel" class="modal-title">Example Dialog</h4>'+
                           '</div>'+
                           '<div class="modal-body"><p>This is an example body.</p></div>'+
                           '<div class="modal-footer">'+
                             '<button class="btn btn-default" data-dismiss="modal" aria-hidden="true">Cancel</button>'+
                             '<button id="simple-modal-apply-btn" class="btn btn-primary">Apply</button>'+
                           '</div>'+
                         '</div>'+
                       '</div>'+
                     '</div>',
                     modal.el.outerHTML);
      });
    });

    describe('with custom views', function () {
      var HeaderView = Backbone.View.extend({
        className: 'modal-header',
        render: function() {
            this.$el.html("<h3>Custom Header</h3>");
            return this;
        }
      });
      var BodyView = Backbone.View.extend({
        className: 'modal-body',
        render: function() {
            this.$el.html("<u>Custom Body</u>");
            return this;
        }
      });
      var FooterView = Backbone.View.extend({
        className: 'modal-footer',
        render: function() {
            this.$el.html("<button>Custom Footer</button>");
            return this;
        }
      });
      var modal = new BackboneBootstrapModals.BaseModal({
        headerView: HeaderView,
        bodyView: BodyView,
        footerView: FooterView,
        modalOptions: {
          show: false
        }
      });

      it('should render default markup', function () {
        modal.render();
        assert.equal('<div tabindex="-1" role="dialog" aria-labelledby="myModalLabel" class="modal">'+
                       '<div class="modal-dialog">'+
                         '<div class="modal-content">'+
                           '<div class="modal-header">'+
                             '<h3>Custom Header</h3>'+
                           '</div>'+
                           '<div class="modal-body"><u>Custom Body</u></div>'+
                           '<div class="modal-footer">'+
                             '<button>Custom Footer</button>'+
                           '</div>'+
                         '</div>'+
                       '</div>'+
                     '</div>',
                     modal.el.outerHTML);
      });
    });

    describe('when extended', function () {
      var HeaderView = Backbone.View.extend({
        className: 'modal-header',
        render: function() {
            this.$el.html("<h3>Custom Header</h3>");
            return this;
        }
      });
      var BodyView = Backbone.View.extend({
        className: 'modal-body',
        render: function() {
            this.$el.html("<u>Custom Body</u>");
            return this;
        }
      });
      var FooterView = Backbone.View.extend({
        className: 'modal-footer',
        render: function() {
            this.$el.html("<button>Custom Footer</button>");
            return this;
        }
      });
      var ExtendedModal = BackboneBootstrapModals.BaseModal.extend({
        headerView: HeaderView,
        bodyView: BodyView,
        footerView: FooterView
      });
      var modal = new ExtendedModal({
        modalOptions: {
          show: false
        }
      });

      it('should render default markup', function () {
        modal.render();
        assert.equal('<div tabindex="-1" role="dialog" aria-labelledby="myModalLabel" class="modal">'+
                       '<div class="modal-dialog">'+
                         '<div class="modal-content">'+
                           '<div class="modal-header">'+
                             '<h3>Custom Header</h3>'+
                           '</div>'+
                           '<div class="modal-body"><u>Custom Body</u></div>'+
                           '<div class="modal-footer">'+
                             '<button>Custom Footer</button>'+
                           '</div>'+
                         '</div>'+
                       '</div>'+
                     '</div>',
                     modal.el.outerHTML);
      });
    });

  });
})();
