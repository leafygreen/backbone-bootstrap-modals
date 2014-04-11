/* global describe, it */

(function () {
  'use strict';

  describe('BaseHeaderView', function () {
    describe('with no options', function () {
      var view = new BackboneBootstrapModals.BaseHeaderView();

      it('should render default markup', function () {
        view.render();
        assert.equal('<div class="modal-header">'+
                       '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>'+
                       '<h4 id="myModalLabel" class="modal-title"></h4>'+
                     '</div>',
                     view.el.outerHTML);
      });
    });

    describe('with basic options', function () {
      var view = new BackboneBootstrapModals.BaseHeaderView({
        label: 'Hello',
        labelId: 'hello-title',
        showClose: false
      });

      it('should render default markup', function () {
        view.render();
        assert.equal('<div class="modal-header">'+
                       '<h4 id="hello-title" class="modal-title">Hello</h4>'+
                     '</div>',
                     view.el.outerHTML);
      });
    });
  });
})();
