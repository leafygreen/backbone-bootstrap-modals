/* global describe, it */

(function () {
  'use strict';

  describe('BaseModal', function() {
    describe('with no options', function() {
      var modal;

      beforeEach(function() {
        modal = new BackboneBootstrapModals.BaseModal({
          modalOptions: {
            show: false
          }
        });
      });

      it('should render default markup', function() {
        modal.render();
        assert.equal(modal.el.outerHTML,
                     '<div tabindex="-1" role="dialog" aria-labelledby="myModalLabel" class="modal">'+
                       '<div class="modal-dialog">'+
                         '<div class="modal-content">'+
                           '<div class="modal-header">'+
                             '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">\u00D7</button>'+
                             '<h4 id="myModalLabel" class="modal-title"></h4>'+
                           '</div>'+
                           '<div class="modal-body"></div>'+
                           '<div class="modal-footer"></div>'+
                         '</div>'+
                       '</div>'+
                     '</div>');
      });
    });



    describe('with basic options', function() {
      var modal;

      beforeEach(function() {
        modal = new BackboneBootstrapModals.BaseModal({
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
      });

      it('should render default markup', function() {
        modal.render();
        assert.equal(modal.el.outerHTML,
                     '<div tabindex="-1" role="dialog" aria-labelledby="myModalLabel" class="modal">'+
                       '<div class="modal-dialog">'+
                         '<div class="modal-content">'+
                           '<div class="modal-header">'+
                             '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">\u00D7</button>'+
                             '<h4 id="exampleModalLabel" class="modal-title">Example Dialog</h4>'+
                           '</div>'+
                           '<div class="modal-body"><p>This is an example body.</p></div>'+
                           '<div class="modal-footer">'+
                             '<button class="btn btn-default" data-dismiss="modal" aria-hidden="true">Cancel</button>'+
                             '<button id="simple-modal-apply-btn" class="btn btn-primary">Apply</button>'+
                           '</div>'+
                         '</div>'+
                       '</div>'+
                     '</div>');
      });
    });

    describe('with custom views', function() {
      var modal;

      beforeEach(function() {
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
        modal = new BackboneBootstrapModals.BaseModal({
          headerView: HeaderView,
          bodyView: BodyView,
          footerView: FooterView,
          modalOptions: {
            show: false
          }
        });
      });

      it('should render default markup', function() {
        modal.render();
        assert.equal(modal.el.outerHTML,
                     '<div tabindex="-1" role="dialog" aria-labelledby="myModalLabel" class="modal">'+
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
                     '</div>');
      });
    });

    describe('when extended', function() {
      var modal;

      beforeEach(function() {
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
        modal = new ExtendedModal({
          modalOptions: {
            show: false
          }
        });
      });

      it('should render default markup', function() {
        modal.render();
        assert.equal(modal.el.outerHTML,
                     '<div tabindex="-1" role="dialog" aria-labelledby="myModalLabel" class="modal">'+
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
                     '</div>');
      });
    });

    describe('when extended with get*View functions', function() {
      var modal;

      beforeEach(function() {
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
          getHeaderView: function() { return HeaderView; },
          getBodyView: function() { return BodyView; },
          getFooterView: function() { return FooterView; }
        });
        modal = new ExtendedModal({
          modalOptions: {
            show: false
          }
        });
      });

      it('should render default markup', function() {
        modal.render();
        assert.equal(modal.el.outerHTML,
                     '<div tabindex="-1" role="dialog" aria-labelledby="myModalLabel" class="modal">'+
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
                     '</div>');
      });
    });

    describe('when using forwarded model property in views', function() {
      var modal;

      beforeEach(function() {
        var model = new Backbone.Model({
          name: "TestModelName"
        });
        var HeaderView = Backbone.View.extend({
          className: 'modal-header',
          render: function() {
              this.$el.html("<h3>"+this.model.get('name')+"</h3>");
              return this;
          }
        });
        var BodyView = Backbone.View.extend({
          className: 'modal-body',
          render: function() {
              this.$el.html("<u>"+this.model.get('name')+"</u>");
              return this;
          }
        });
        var FooterView = Backbone.View.extend({
          className: 'modal-footer',
          render: function() {
              this.$el.html("<button>"+this.model.get('name')+"</button>");
              return this;
          }
        });
        var ExtendedModal = BackboneBootstrapModals.BaseModal.extend({
          model: model,
          headerView: HeaderView,
          bodyView: BodyView,
          footerView: FooterView
        });
        modal = new ExtendedModal({
          modalOptions: {
            show: false
          }
        });
      });

      it('should render expected markup', function() {
        modal.render();
        assert.equal(modal.el.outerHTML,
                     '<div tabindex="-1" role="dialog" aria-labelledby="myModalLabel" class="modal">'+
                       '<div class="modal-dialog">'+
                         '<div class="modal-content">'+
                           '<div class="modal-header">'+
                             '<h3>TestModelName</h3>'+
                           '</div>'+
                           '<div class="modal-body"><u>TestModelName</u></div>'+
                           '<div class="modal-footer">'+
                             '<button>TestModelName</button>'+
                           '</div>'+
                         '</div>'+
                       '</div>'+
                     '</div>');
      });
    });

    describe('when view options are functions', function() {
      var modal, onRenderCalled, onCloseCalled;

      beforeEach(function() {
        var ExtendedModal = BackboneBootstrapModals.BaseModal.extend({
          headerViewOptions: function() {
            return {
              label: 'Function Dialog'
            };
          },
          bodyViewOptions: function() {
            return {
              text: 'This is a function option.'
            };
          },
          footerViewOptions: function() {
            return {
              buttons: [
                { className: 'btn btn-default', value: 'Cancel', attributes: { 'data-dismiss': 'modal', 'aria-hidden': 'true' }},
                { id: 'full-modal-apply-btn', className: 'btn btn-primary', value: 'Function' }
              ]
            };
          },
          onRender: function() { onRenderCalled = true; },
          onClose: function() { onCloseCalled = true; },
        });
        modal = new ExtendedModal({
          modalOptions: {
            show: false
          }
        });
        onRenderCalled = false;
        onCloseCalled = false;
      });

      it('should render expected markup', function() {
        modal.render();
        assert.equal(modal.el.outerHTML,
                     '<div tabindex="-1" role="dialog" aria-labelledby="myModalLabel" class="modal">'+
                       '<div class="modal-dialog">'+
                         '<div class="modal-content">'+
                           '<div class="modal-header">'+
                             '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">\u00D7</button>'+
                             '<h4 id="myModalLabel" class="modal-title">Function Dialog</h4>'+
                           '</div>'+
                           '<div class="modal-body"><p>This is a function option.</p></div>'+
                           '<div class="modal-footer">'+
                             '<button class="btn btn-default" data-dismiss="modal" aria-hidden="true">Cancel</button>'+
                             '<button id="full-modal-apply-btn" class="btn btn-primary">Function</button>'+
                           '</div>'+
                         '</div>'+
                       '</div>'+
                     '</div>');
      });

      it('should call onRender after render', function() {
        modal.render();
        assert.equal(onRenderCalled, true);
      });

      it('should call onClose after remove', function() {
        modal.remove();
        assert.equal(onCloseCalled, true);
      });
    });

  });
})();
