/* global describe, it */

(function () {
  'use strict';

  describe('WizardModal', function () {
    describe('with no options', function () {
      var modal = new BackboneBootstrapModals.WizardModal({
        steps: [{
          label: 'Wizard: Step One',
          view: BackboneBootstrapModals.BaseBodyView,
          viewOptions: { text: 'This is step one' },
          onNext: function() {},
          nextText: 'Finish'
        }],
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
                             '<h4 id="myModalLabel" class="modal-title">Wizard: Step One</h4>'+
                           '</div>'+
                           '<div class="modal-body">'+
                             '<p>This is step one</p>'+
                           '</div>'+
                           '<div class="modal-footer">'+
                             '<button id="confirmation-next-btn" class="btn btn-primary">Finish</button>'+
                           '</div>'+
                         '</div>'+
                       '</div>'+
                     '</div>',
                     modal.el.outerHTML);
      });
    });

  });
})();
