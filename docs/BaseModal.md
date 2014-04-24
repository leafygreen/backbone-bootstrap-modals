# BackboneBootstrapModals.BaseModal

`BaseModal` represents the base class all modals should extend from. It 
consists of three subviews: headerView, bodyView, and footerView, which can be defined as class properties/functions or passed in as options.

Rendering the modal causes each of the subviews to be rendered and appended to the modal view's `el`.

## Documentation Index

* [BaseModal's `headerView`](#basemodals-headerview)
  * [BaseModal's `getHeaderView`](#basemodals-getheaderview)
  * [BaseModal's `headerViewOptions`](#basemodals-headerviewoptions)
* [BaseModal's `bodyView`](#basemodals-bodyview)
  * [BaseModal's `getBodyView`](#basemodals-getbodyview)
  * [BaseModal's `bodyViewOptions`](#basemodals-bodyviewoptions)
* [BaseModal's `footerView`](#basemodals-footerview)
  * [BaseModal's `getFooterView`](#basemodals-getfooteriew)
  * [BaseModal's `footerViewOptions`](#basemodals-footerviewoptions)
* [BaseModal's Subviews Example](#basemodals-subviews-example)
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

## BaseModal's `headerView`

Specify the `headerView` which controls the Bootstrap Modal's `modal-header` div. This must be
a Backbone view object definition, not an instance.

### BaseModal's `getHeaderView`
The value returned by this method is the `headerView` class that will be instantiated when the modal is rendered. Override this method instead of using the `headerView` property when you want to dynamically define the class to be returned.

### CollectionView's `headerViewOptions`

This specifies the options structure that will be passed to the constructor of your headerView.
`model`, `collection`, and `className` (of `modal-header`) properties are automatically passed into the subview.

You can also specify the `headerViewOptions` as an object or a function that returns an object.

## BaseModal's `bodyView`

Specify the `bodyView` which controls the Bootstrap Modal's `modal-body` div. This must be
a Backbone view object definition, not an instance.

### BaseModal's `getBodyView`
The value returned by this method is the `bodyView` class that will be instantiated when the modal is rendered. Override this method instead of using the `bodyView` property when you want to dynamically define the class to be returned.

### CollectionView's `bodyViewOptions`

This specifies the options structure that will be passed to the constructor of your bodyView.
`model`, `collection`, and `className` (of `modal-body`) properties are automatically passed into the subview.

You can also specify the `bodyViewOptions` as an object or a function that returns an object.

## BaseModal's `footerView`

Specify the `bodyView` which controls the Bootstrap Modal's `modal-footer` div. This must be
a Backbone view object definition, not an instance.

### BaseModal's `getFooterView`
The value returned by this method is the `footerView` class that will be instantiated when the modal is rendered. Override this method instead of using the `footerView` property when you want to dynamically define the class to be returned.

### CollectionView's `footerViewOptions`

This specifies the options structure that will be passed to the constructor of your footerView.
`model`, `collection`, and `className` (of `modal-footer`) properties are automatically passed into the subview.

You can also specify the `footerViewOptions` as an object or a function that returns an object.

## BaseModal's Subviews Example

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
