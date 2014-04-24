# BackboneBootstrapModals.BaseFooterView
# BackboneBootstrapModals.BaseFooterView

`BaseFooterView` is the default implementation of a body view.

## Documentation Index

* [BaseFooterView's `options`](#basefooterview-options)

## BaseFooterView's `options`

This view is specified with the following options.  These can be specified as properties when extending the class or passed in as options when instantiating this class.

| Property   | Description                                               | Default          |
| -----------|----------------------------------------------------------:|-----------------:|
| buttons    | Structure defining the buttons to be placed in the footer |                  |

Example:

```javascript
view = new BackboneBootstrapModals.BaseFooterView({
  buttons: [
    { className: 'btn btn-default', value: 'Cancel', attributes: { 'data-dismiss': 'modal', 'aria-hidden': 'true' }},
    { id: 'simple-modal-apply-btn', className: 'btn btn-primary', value: 'Apply' }
  ]
});
```
