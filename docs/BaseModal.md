# BackboneBootstrapModals.BaseModal

The `BaseModal` represents the base class all modals should extend from. It 
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

Specify the `headerView` for the modal. This must be
a Backbone view object definition, not an instance.

### BaseModal's `getHeaderView`
The value returned by this method is the `headerView` class that will be instantiated when the modal is rendered.

### CollectionView's `headerViewOptions`

This specifies the options structure that will be passed to the constructor of your headerView.
`model`, `collection`, and `className` (of `modal-header`) properties are automatically passed into the subview.

You can also specify the `headerViewOptions` as an object or a function that returns an object.

## BaseModal's `bodyView`

Specify the `bodyView` for the modal. This must be
a Backbone view object definition, not an instance.

### BaseModal's `getBodyView`
The value returned by this method is the `bodyView` class that will be instantiated when the modal is rendered.

### CollectionView's `bodyViewOptions`

This specifies the options structure that will be passed to the constructor of your bodyView.
`model`, `collection`, and `className` (of `modal-body`) properties are automatically passed into the subview.

You can also specify the `bodyViewOptions` as an object or a function that returns an object.

## BaseModal's `footerView`

Specify the `footerView` for the modal. This must be
a Backbone view object definition, not an instance.

### BaseModal's `getFooterView`
The value returned by this method is the `footerView` class that will be instantiated when the modal is rendered.

### CollectionView's `footerViewOptions`

This specifies the options structure that will be passed to the constructor of your footerView.
`model`, `collection`, and `className` (of `modal-footer`) properties are automatically passed into the subview.

You can also specify the `footerViewOptions` as an object or a function that returns an object.

## BaseModal's `modalOptions`

TODO

## BaseModal's `show`

TODO

## BaseModal's `hide`

TODO

## BaseModal's `remove`

TODO

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

TODO

### onShow callback

TODO

### onShown callback

TODO

### onHide callback

TODO

### onHidden callback

TODO
