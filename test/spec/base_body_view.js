/* global describe, it */

(function () {
  'use strict';

  describe('BaseBodyView', function() {
    describe('with no options', function() {
      var view;

      beforeEach(function() {
        view = new BackboneBootstrapModals.BaseBodyView();
      });

      it('should render default markup', function() {
        view.render();
        assert.equal('<div class="modal-body"></div>',
                     view.el.outerHTML);
      });
    });

    describe('with basic options', function() {
      var view;

      beforeEach(function() {
        view = new BackboneBootstrapModals.BaseBodyView({
          text: 'hello world',
          textTagName: 'pre'
        });
      });

      it('should render default markup', function() {
        view.render();
        assert.equal('<div class="modal-body"><pre>hello world</pre></div>',
                     view.el.outerHTML);
      });
    });

    describe('with text array', function() {
      var view;

      beforeEach(function() {
        view = new BackboneBootstrapModals.BaseBodyView({
          text: ['hello', 'world']
        });
      });

      it('should render default markup', function() {
        view.render();
        assert.equal('<div class="modal-body"><p>hello</p><p>world</p></div>',
                     view.el.outerHTML);
      });
    });
  });
})();
