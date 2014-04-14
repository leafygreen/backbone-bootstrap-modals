/* global describe, it */

(function () {
  'use strict';

  describe('WizardModal', function () {
    describe('with no options', function () {
      var modal = new BackboneBootstrapModals.WizardModal({
        stepGraph: [{
          label: 'Wizard: Step One',
          view: BackboneBootstrapModals.BaseBodyView,
          viewOptions: { text: 'This is step one' },
          nextIndex: 1,
          onNext: function() {
            console.log('next for step one');
          }
        },
        {
          label: 'Wizard: Step Two',
          view: BackboneBootstrapModals.BaseBodyView,
          viewOptions: { text: 'This is step two' },
          nextIndex: 2,
          previousIndex: 0,
          onNext: function() {
            console.log('next for step two');
          }
        },
        {
          label: 'Wizard: Step Three',
          view: BackboneBootstrapModals.BaseBodyView,
          viewOptions: { text: 'This is step three' },
          nextText: 'Finish',
          previousIndex: 1,
          onNext: function() {
            console.log('next for step three');
          }
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
                             '<button id="confirmation-next-btn" class="btn btn-primary">Next</button>'+
                           '</div>'+
                         '</div>'+
                       '</div>'+
                     '</div>',
                     modal.el.outerHTML);
      });

      it('can be advanced to next step', function(done) {
        modal.render();
        var handler = function() {
          modal.$el.off('click', '#confirmation-next-btn', handler);
          assert.equal('<div tabindex="-1" role="dialog" aria-labelledby="myModalLabel" class="modal">'+
                       '<div class="modal-dialog">'+
                         '<div class="modal-content">'+
                           '<div class="modal-header">'+
                             '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>'+
                             '<h4 id="myModalLabel" class="modal-title">Wizard: Step Two</h4>'+
                           '</div>'+
                           '<div class="modal-body">'+
                             '<p>This is step two</p>'+
                           '</div>'+
                           '<div class="modal-footer">'+
                             '<button id="confirmation-previous-btn" class="btn btn-default">Previous</button>'+
                             '<button id="confirmation-next-btn" class="btn btn-primary">Next</button>'+
                           '</div>'+
                         '</div>'+
                       '</div>'+
                     '</div>',
                     modal.el.outerHTML);
          done();
        };
        modal.$el.on('click', '#confirmation-next-btn', handler);
        modal.$el.find('#confirmation-next-btn').click();
      });

  });
})();
