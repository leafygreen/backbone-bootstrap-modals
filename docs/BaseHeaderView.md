# BackboneBootstrapModals.BaseHeaderView

`BaseHeaderView` is the default implementation of a header view.

## Documentation Index

* [BaseHeaderView's `options`](#baseheaderviews-options)

## BaseHeaderView's `options`

This view is specified with the following options.  These can be specified as properties when extending the class or passed in as options when instantiating this class.

| Property   | Description                                                  | Default          |
| -----------|-------------------------------------------------------------:|-----------------:|
| label      | The text to display at the top of the header                 | `''`             |
| labelId    | The label identifier for use with `aria-labelledby`          | `'myModalLabel'` |
| showClose  | If true, shows the close icon in the top-right of the header | true             |

Example:

```javascript
view = new BackboneBootstrapModals.BaseHeaderView({
  label: 'Fancy Modal Header',
  labelId: 'myFancyModalLabel',
  showClose: true
});
```
