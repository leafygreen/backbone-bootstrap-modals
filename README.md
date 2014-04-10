backbone-bootstrap-modals
=========================

The goal of backbone-bootstrap-modals is to produce a set of core Backbone Views
when working with Bootstrap modal dialogs.

## Advantages

- Simple integration with Bootstrap and Backbone
- Easily extensible
- Works with Marionette Views

## Download Links

[backbone-bootstrap-modals.js](https://raw.githubusercontent.com/leafygreen/backbone-bootstrap-modals/master/lib/backbone-bootstrap-modals.js)

[backbone-bootstrap-modals.min.js](https://raw.githubusercontent.com/leafygreen/backbone-bootstrap-modals/master/lib/backbone-bootstrap-modals.min.js)

## Documentation

[Annotated Source Code](http://leafygreen.github.io/backbone-bootstrap-modals/docs/backbone-bootstrap-modals.html)

[Live Example](http://leafygreen.github.io/backbone-bootstrap-modals/example.html)

### BackboneBootstrapModals.BaseModal

A basic example of using the BaseModal when passing in sub views.

```javascript
var modal = new BackboneBootstrapModals.BaseModal({
  headerView: new BackboneBootstrapModals.BaseHeaderView({
    label: 'Example Dialog',
    labelId: 'myModalLabel',
    showClose: true,
  }),
  bodyView: new BackboneBootstrapModals.BaseBodyView({
    text: 'This is an example body.'
  }),
  footerView: new BackboneBootstrapModals.BaseFooterView({
    buttons: [
      { className: 'btn btn-default', value: 'Cancel', attributes: { 'data-dismiss': 'modal', 'aria-hidden': 'true' }},
      { id: 'full-modal-apply-btn', className: 'btn btn-primary', value: 'Apply' }
    ]
  }),
  modalOptions: {
    backdrop: true,
    keyboard: true
  }
});
modal.render();
```

A basic example of using the BaseModal when using the default sub views.

```javascript
var modal = new BackboneBootstrapModals.BaseModal({
  headerViewOptions: {
    label: 'Example Dialog',
    labelId: 'myModalLabel',
    showClose: true,
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
    backdrop: true,
    keyboard: true
  }
});
modal.render();
```

### BackboneBootstrapModals.ConfirmationModal

A basic example of the Confirmation functionality.

```javascript
var modal = new BackboneBootstrapModals.ConfirmationModal({
  label: 'Confirm Action',
  text: 'Are you sure you want to do that?',
  onConfirm: function() {
    console.log("action confirmed");
  },
  onCancel: function() {
    console.log("action canceled");
  }
});
modal.render();
```

### BackboneBootstrapModals.WizardModal

A basic example of the Wizard functionality.

```javascript
var modal = new BackboneBootstrapModals.WizardModal({
  steps: [{
    label: 'Wizard: Step One',
    view: BackboneBootstrapModals.BaseBodyView,
    viewOptions: { text: 'This is step one' },
    onNext: function() {
      console.log('next for step one');
  }
  },
  {
    label: 'Wizard: Step Two',
    view: BackboneBootstrapModals.BaseBodyView,
    viewOptions: { text: 'This is step two' },
    onNext: function() {
      console.log('next for step two');
    }
  },
  {
    label: 'Wizard: Step Three',
    view: BackboneBootstrapModals.BaseBodyView,
    viewOptions: { text: 'This is step three' },
    nextText: 'Finish',
    onNext: function() {
      console.log('next for step three');
    }
  }]
});
modal.render();
```

## Supported browsers

Should work with all modern browsers, including Internet Exploror 9+

## Building

```
bower install
grunt
```

## Running the tests

```
grunt test
```

## Contributing

Contributions are welcome! To make the process as seamless as possible, please:

* Fork the project and make your changes. We encourage pull requests to discuss code changes.
* Have test cases for the new code. If you have questions about how to do this, please ask in your pull request.


## License
Licensed under the [MIT license](LICENSE-MIT "MIT License").

## Shout Outs

backbone-bootstrap-modals is a [MongoDB](http://www.mongodb.com) Skunkworks Project
![Friendly Skunk](http://s12.postimg.org/fxmtcosx9/skunkworks2.jpg)
