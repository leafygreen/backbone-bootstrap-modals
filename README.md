backbone-bootstrap-modals
=========================
[![Build Status](https://travis-ci.org/leafygreen/backbone-bootstrap-modals.svg?branch=master)](https://travis-ci.org/leafygreen/backbone-bootstrap-modals)
[![Code Climate](https://codeclimate.com/github/leafygreen/backbone-bootstrap-modals.png)](https://codeclimate.com/github/leafygreen/backbone-bootstrap-modals)

The goal of backbone-bootstrap-modals is to produce a set of core Backbone Views
when working with Bootstrap modal dialogs.

## Advantages

- Simple integration with Bootstrap and Backbone
- Easily extensible with sane defaults
- All boilerplate taken care of for you
- Compatible with Marionette Views

## Installing with NPM

`npm install backbone-bootstrap-modals`

## Download Links

[backbone-bootstrap-modals.js](https://raw.githubusercontent.com/leafygreen/backbone-bootstrap-modals/master/lib/backbone-bootstrap-modals.js)

[backbone-bootstrap-modals.min.js](https://raw.githubusercontent.com/leafygreen/backbone-bootstrap-modals/master/lib/backbone-bootstrap-modals.min.js)

## Documentation

The source code is well annotated and run through Docco:

[**Annotated Source Code**](http://leafygreen.github.io/backbone-bootstrap-modals/docco/backbone-bootstrap-modals.html)

Please click the following links to see the library in action:

* [**Basic Example**](http://leafygreen.github.io/backbone-bootstrap-modals/example.html)
* [**Validating Footer Example**](http://leafygreen.github.io/backbone-bootstrap-modals/validating-footer-example.html)

(See [**/examples**](/examples))

**Component Documentation**

 * [**BaseModal**](docs/BaseModal.md)
  * [**BaseHeaderView**](docs/BaseHeaderView.md)
  * [**BaseBodyView**](docs/BaseBodyView.md)
  * [**BaseFooterView**](docs/BaseFooterView.md)
 * [**ConfirmationModal**](docs/ConfirmationModal.md)
 * [**WizardModal**](docs/WizardModal.md)

**Quick Examples**

```javascript
// Extending BaseModal
var ExtendedModal = BackboneBootstrapModals.BaseModal.extend({
  headerView: BackboneBootstrapModals.BaseHeaderView,
  headerViewOptions: {
    label: 'Extended Example'
  },
  bodyView: BackboneBootstrapModals.BaseBodyView,
  // options may be defined as functions
  bodyViewOptions: function() {
    return {
      text: 'Today is '+new Date()
    };
  },
  // subviews may be dynamically defined
  getFooterView: function() { return BackboneBootstrapModals.BaseFooterView; },
  footerViewOptions: {
    buttons: [
      { className: 'btn btn-default', value: 'Cancel', attributes: { 'data-dismiss': 'modal', 'aria-hidden': 'true' }},
      { id: 'apply-btn', className: 'btn btn-primary', value: 'Apply' }
    ]
  }
});
var modal = new ExtendedModal();
modal.render();
```

```javascript
// Using ConfirmationModal directly (It could also be extended as above.)
var modal = new BackboneBootstrapModals.ConfirmationModal({
  label: 'Confirm Action',
  text: 'Are you sure you want to do that?',
  onConfirm: function() {
    console.log("action confirmed");
  }
});
modal.render();
```

```javascript
// Using WizardModal directly (It could also be extended as above.)
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
  }]
});
modal.render();
```

## Supported browsers

Should work with all modern browsers, including Internet Exploror 9+

## Building

```
npm install
grunt
```

## Running the tests

```
cd test
grunt mocha
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
