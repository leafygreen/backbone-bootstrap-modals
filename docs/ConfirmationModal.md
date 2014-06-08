# BackboneBootstrapModals.ConfirmationModal

`ConfirmationModal` represents a simple extension of BaseModal for simple confirmation modals, e.g. confirming a user wants to perform an action.

The modal consists of a series a customization properties.

A user may also override with a custom bodyView.

## Documentation Index

* [ConfirmationModal's Properties](#confirmationmodals-properties)
* [ConfirmationModal Basic Example](#confirmationmodal-basic-example)
* [ConfirmationModal Custom Body Example](#confirmationmodal-custom-body-example)

## ConfirmationModal's Properties

| Property     | Description                                                  | Default          |
| -------------|-------------------------------------------------------------:|-----------------:|
| label        | The text to display at the top of the header                 | `''`             |
| labelId      | The label identifier for use with `aria-labelledby`          | `'myModalLabel'` |
| labelTagName | The label tag used for `modal-title` element                 | `'h4'`           |
| showClose    | If true, shows the close icon in the top-right of the header | true             |
| text      | The text to in the modal body in within a `p` tag. An array of text can be specified for multiple tags. |                  |
| confirmText        | The text to display inside the confirm button          | `'Confirm'`      |
| confirmClassName        | The button style class to use for the confirm button | `'btn-primary'` |
| cancelText        | The text to display inside the cancel button            | `'Cancel'`       |
| cancelClassName        | The button style class to use for the confirm button | `'btn-default'` |
| showCancel        | Whether or not to show the cancel button            | `'true'`             |
| onConfirm        | Function callback when the confirm button is clicked. The modal will automatically be hidden unless this callback returns false. |                  |

## ConfirmationModal's Basic Example

var CustomView = Backbone.View.extend({
  initialize: function(opts) {
    this.displayValue = opts.displayValue;
  },
  render: function() {
      this.$el.html("<b>Custom View: "+this.displayValue+"</b>");
      return this;
  }
});
var modal = new BackboneBootstrapModals.ConfirmationModal({
  label: 'Confirm Action',
  labelId: 'myLabelId',
  labelTagName: 'h3',
  text: ['Are you sure you want to do that?', 'Really sure?'],
  cancelText: 'No',
  cancelClassName: 'myCancelClass',
  confirmText: 'Yes',
  confirmClassName: 'myConfirmClass',
  onConfirm: function() {
    console.log("confirmed");
  }
});
modal.render();
```

## BaseModal's Custom Body Example

```javascript
var CustomView = Backbone.View.extend({
  initialize: function(opts) {
    this.displayValue = opts.displayValue;
  },
  render: function() {
      this.$el.html("<b>Custom View: "+this.displayValue+"</b>");
      return this;
  }
});
var modal = new BackboneBootstrapModals.ConfirmationModal({
  label: 'Confirm Custom Action',
  bodyView: CustomView,
  bodyViewOptions: { displayValue: 'myOption' },
  onConfirm: function() {
    console.log("confirmed");
  }
});
modal.render();
```
