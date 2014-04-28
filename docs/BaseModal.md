# BackboneBootstrapModals.BaseModal

`BaseModal` represents the base class all modals should extend from. It 
consists of three subviews: headerView, bodyView, and footerView, which can be defined as class properties/functions or passed in as options.

Rendering the modal causes each of the subviews to be rendered and appended to the modal view's `el`.

Note that the modal's `el` never has to be explicity added to the document, as Bootstrap's show logic handles this.

## Documentation Index

* [BaseModal's Subview Properties](#basemodals-subview-properties)
  * [BaseModal's Subview Functions](#basemodals-subview-functions)
  * [BaseModal's Subview Options](#basemodals-subview-options)
* [BaseModal's Subview Example](#basemodals-subviews-example)
* [BaseModal's `modalOptions`](#basemodals-modaloptions)
* [BaseModal's `show`](#basemodals-show)
* [BaseModal's `hide`](#basemodals-hide)
* [BaseModal's `remove`](#basemodals-remove)
* [Callback Methods](#callback-methods)
  * [onRender callback](#onrender-callback)
  * [onClose callback](#onclose-callback)
  * [onShow callback](#onshow-callback)
  * [onShown callback](#onshown-callback)
  * [onHide callback](#onhide-callback)
  * [onHidden callback](#onhidden-callback)

## BaseModal's Subview Properties

You may specify each subview using the `headerView`, `bodyView`, and `footerView` properties.
These must be Backbone view object definitions, not an instances.

* `headerView` controls the Bootstrap Modal's `modal-header` div. 
* `bodyView` controls the Bootstrap Modal's `modal-body` div. 
* `footerView` controls the Bootstrap Modal's `modal-footer` div. 

### BaseModal's Subview Functions

Alternatively you may override the `getHeaderView`, `getBodyView`, and `getFooterView` methods. The value returned by these method is the class that will be instantiated when the modal is rendered. Use this approach when you want to dynamically define the classes.

### BaseModel's Subview Options

You may specify the options structures that will be passed to the constructors of your subviews with `headerViewOptions`, `bodyViewOptions`, and `footerViewOptions`.

`model`, `collection`, and `className` (of `modal-header`) properties are automatically passed into the subview.

You may specify each property as an object or a function that returns an object.

## BaseModal's Subview Example

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

## BaseModal's `modalOptions`

The `modalOptions` structures defines the properties sent to Bootstrap's `modal` function.

```javascript
// Defaults
modalOptions: {
  backdrop: true,
  keyboard: true
}
```

[See Bootstrap Modal Usage](http://getbootstrap.com/javascript/#modals-usage)
The `remote` property is not supported.

## BaseModal's `show`

Shortcut method for `this.$el.modal('show')`

## BaseModal's `hide`

Shortcut method for `this.$el.modal('hide')`

## BaseModal's `remove`

This method cleans up all subviews, delegating the Backbone.View.remove.

(This method is called automatically when the modal is hidden.)

## Callback Methods

There are several callback methods that can be provided on a
`BaseModal`. If they are found, they will be called by the
view's base methods. These callback methods are intended to be
handled within the view definition directly.

### onRender callback

After the view has been rendered, a `onRender` method will be called.
You can implement this in your view to provide custom code for dealing
with the view's `el` after it has been rendered:

```js
BackboneBootstrapModals.Marionette.BaseModal.extend({
  onRender: function(){
    // do stuff here
  }
});
```

### onClose callback

After the view has been removed, a `onClose` method will be called.
You can implement this in your view to provide custom cleanup logic:

```js
BackboneBootstrapModals.Marionette.BaseModal.extend({
  onClose: function(){
    // do stuff here
  }
});
```

### onShow callback

After the Bootstrap modal's `show` method has been called, a `onShow` method will be called. 
[See Bootstrap Modal Usage](http://getbootstrap.com/javascript/#modals-usage)

### onShown callback

After the Bootstrap modal has been made visible, a `onShown` method will be called.
[See Bootstrap Modal Usage](http://getbootstrap.com/javascript/#modals-usage)

### onHide callback

After the Bootstrap modal's `hide` method has been called, a `onHide` method will be called. 
[See Bootstrap Modal Usage](http://getbootstrap.com/javascript/#modals-usage)

### onHidden callback

After the Bootstrap modal has finished being hidden, a `onHidden` method will be called. 
[See Bootstrap Modal Usage](http://getbootstrap.com/javascript/#modals-usage)
