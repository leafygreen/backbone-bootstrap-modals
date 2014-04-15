/* global describe, it */

(function () {
  'use strict';

  describe('ConfirmationModal', function() {
    describe('with no options', function() {
      var modal;

      beforeEach(function() {
        modal = new BackboneBootstrapModals.ConfirmationModal({
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
                             '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>'+
                             '<h4 id="myModalLabel" class="modal-title"></h4>'+
                           '</div>'+
                           '<div class="modal-body"></div>'+
                           '<div class="modal-footer">'+
                             '<button id="confirmation-cancel-btn" class="btn btn-default" data-dismiss="modal" aria-hidden="true">Cancel</button>'+
                             '<button id="confirmation-confirm-btn" class="btn btn-primary">Confirm</button>'+
                           '</div>'+
                         '</div>'+
                       '</div>'+
                     '</div>');
      });
    });

    describe('with basic options', function() {
      var modal, confirmCalled;

      beforeEach(function() {
        confirmCalled = false;
        modal = new BackboneBootstrapModals.ConfirmationModal({
          label: 'Confirm Action',
          text: 'Are you sure you want to do that?',
          onConfirm: function() {
            confirmCalled = true;
          },
          modalOptions: {
            show: false
          }
        });
      });

      it('should render specified markup', function() {
        modal.render();
        assert.equal(modal.el.outerHTML,
                     '<div tabindex="-1" role="dialog" aria-labelledby="myModalLabel" class="modal">'+
                       '<div class="modal-dialog">'+
                         '<div class="modal-content">'+
                           '<div class="modal-header">'+
                             '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>'+
                             '<h4 id="myModalLabel" class="modal-title">Confirm Action</h4>'+
                           '</div>'+
                           '<div class="modal-body"><p>Are you sure you want to do that?</p></div>'+
                           '<div class="modal-footer">'+
                             '<button id="confirmation-cancel-btn" class="btn btn-default" data-dismiss="modal" aria-hidden="true">Cancel</button>'+
                             '<button id="confirmation-confirm-btn" class="btn btn-primary">Confirm</button>'+
                           '</div>'+
                         '</div>'+
                       '</div>'+
                     '</div>');
      });

      it('should call onConfirm when confirm button clicked', function(done) {
        modal.render();
        var handler = function() {
          modal.$el.off('click.test');
          // ensure onConfirm handler defined above is called
          assert.equal(confirmCalled, true);
          done();
        };
        modal.$el.on('click.test', '#confirmation-confirm-btn', handler);
        modal.$el.find('#confirmation-confirm-btn').click();
      });
    });

    describe('with custom body view', function() {
      var modal;

      beforeEach(function() {
        var CustomView = Backbone.View.extend({
          className: 'modal-body',
          render: function() {
              this.$el.html("<b>Custom View</b>");
              return this;
          }
        });
        modal = new BackboneBootstrapModals.ConfirmationModal({
          label: 'Confirm Custom Action',
          bodyView: CustomView,
          onConfirm: function() {
          },
          modalOptions: {
            show: false
          }
        });
      });

      it('should render specified markup', function() {
        modal.render();
        assert.equal(modal.el.outerHTML,
                     '<div tabindex="-1" role="dialog" aria-labelledby="myModalLabel" class="modal">'+
                       '<div class="modal-dialog">'+
                         '<div class="modal-content">'+
                           '<div class="modal-header">'+
                             '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>'+
                             '<h4 id="myModalLabel" class="modal-title">Confirm Custom Action</h4>'+
                           '</div>'+
                           '<div class="modal-body"><b>Custom View</b></div>'+
                           '<div class="modal-footer">'+
                             '<button id="confirmation-cancel-btn" class="btn btn-default" data-dismiss="modal" aria-hidden="true">Cancel</button>'+
                             '<button id="confirmation-confirm-btn" class="btn btn-primary">Confirm</button>'+
                           '</div>'+
                         '</div>'+
                       '</div>'+
                     '</div>');
      });
    });

  });
})();
