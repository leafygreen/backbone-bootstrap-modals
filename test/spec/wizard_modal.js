/* global describe, it */

(function () {
  'use strict';

  describe('WizardModal', function() {
    describe('with basic options', function() {

      var modal, completedStep1, completedStep2, completedStep3;

      beforeEach(function() {
        completedStep1 = false;
        completedStep2 = false;
        completedStep3 = false;
        modal = new BackboneBootstrapModals.WizardModal({
          stepGraph: [{
            label: 'Wizard: Step One',
            view: BackboneBootstrapModals.BaseBodyView,
            viewOptions: { text: 'This is step one' },
            nextIndex: 1,
            onNext: function() {
              // impl for step one
              completedStep1 = true;
            }
          },
          {
            label: 'Wizard: Step Two',
            view: BackboneBootstrapModals.BaseBodyView,
            viewOptions: { text: 'This is step two' },
            nextIndex: 2,
            previousIndex: 0,
            onNext: function() {
              // impl for step two
              completedStep2 = true;
            }
          },
          {
            label: 'Wizard: Step Three',
            view: BackboneBootstrapModals.BaseBodyView,
            viewOptions: { text: 'This is step three' },
            nextText: 'Finish',
            previousIndex: 1,
            onNext: function() {
              // impl for step three
              completedStep3 = true;
            }
          }],
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
                     '</div>');
      });

      it('can be advanced to next step', function(done) {
        modal.render();
        var handler = function() {
          modal.$el.off('click.test');
          // ensure first onNext handler defined above is called
          assert.equal(completedStep1, true);
          assert.equal(modal.el.outerHTML,
                       '<div tabindex="-1" role="dialog" aria-labelledby="myModalLabel" class="modal">'+
                         '<div class="modal-dialog">'+
                           '<div class="modal-content">'+
                             '<div class="modal-header">'+
                               '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">\u00D7</button>'+
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
                       '</div>');
          done();
        };
        modal.$el.on('click.test', '#confirmation-next-btn', handler);
        modal.$el.find('#confirmation-next-btn').click();
      });

      it('can be advanced to last step', function(done) {
        modal.render();
        var handler1 = function() {
          modal.$el.off('click.test');
          var handler2 = function() {
            modal.$el.off('click.test');
            // ensure second onNext handler defined above is called
            assert.equal(completedStep2, true);
            assert.equal(modal.el.outerHTML,
                         '<div tabindex="-1" role="dialog" aria-labelledby="myModalLabel" class="modal">'+
                           '<div class="modal-dialog">'+
                             '<div class="modal-content">'+
                               '<div class="modal-header">'+
                                 '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">\u00D7</button>'+
                                 '<h4 id="myModalLabel" class="modal-title">Wizard: Step Three</h4>'+
                               '</div>'+
                               '<div class="modal-body">'+
                                 '<p>This is step three</p>'+
                               '</div>'+
                               '<div class="modal-footer">'+
                                 '<button id="confirmation-previous-btn" class="btn btn-default">Previous</button>'+
                                 '<button id="confirmation-next-btn" class="btn btn-primary">Finish</button>'+
                               '</div>'+
                             '</div>'+
                           '</div>'+
                         '</div>');
            done();
          };
          modal.$el.on('click.test', '#confirmation-next-btn', handler2);
          modal.$el.find('#confirmation-next-btn').click();
        };
        modal.$el.on('click.test', '#confirmation-next-btn', handler1);
        modal.$el.find('#confirmation-next-btn').click();
      });

      it('can complete last step', function(done) {
        modal.render();
        var handler1 = function() {
          modal.$el.off('click.test');
          var handler2 = function() {
            modal.$el.off('click.test');
            var handler3 = function() {
              modal.$el.off('click.test');
              // ensure final onNext handler defined above is called
              assert.equal(completedStep3, true);
              done();
            };
            modal.$el.on('click.test', '#confirmation-next-btn', handler3);
            modal.$el.find('#confirmation-next-btn').click();
          };
          modal.$el.on('click.test', '#confirmation-next-btn', handler2);
          modal.$el.find('#confirmation-next-btn').click();
        };
        modal.$el.on('click.test', '#confirmation-next-btn', handler1);
        modal.$el.find('#confirmation-next-btn').click();
      });

      it('can retreat to previous step', function(done) {
        modal.render();
        var handler1 = function() {
          modal.$el.off('click.test');
          var handler2 = function() {
            modal.$el.off('click.test');
            assert.equal(modal.el.outerHTML,
                         '<div tabindex="-1" role="dialog" aria-labelledby="myModalLabel" class="modal">'+
                           '<div class="modal-dialog">'+
                             '<div class="modal-content">'+
                               '<div class="modal-header">'+
                                 '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">\u00D7</button>'+
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
                         '</div>');
            done();
          };
          modal.$el.on('click.test', '#confirmation-previous-btn', handler2);
          modal.$el.find('#confirmation-previous-btn').click();
        };
        modal.$el.on('click.test', '#confirmation-next-btn', handler1);
        modal.$el.find('#confirmation-next-btn').click();
      });

    });
  });
})();
