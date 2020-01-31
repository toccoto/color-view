/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type SearchImage_imagePalette$ref: FragmentReference;
declare export opaque type SearchImage_imagePalette$fragmentType: SearchImage_imagePalette$ref;
export type SearchImage_imagePalette = {|
  +searchValue: ?string,
  +imageSrc: ?string,
  +palette: ?$ReadOnlyArray<?{|
    +colorType: ?string,
    +hex: ?string,
  |}>,
  +$refType: SearchImage_imagePalette$ref,
|};
export type SearchImage_imagePalette$data = SearchImage_imagePalette;
export type SearchImage_imagePalette$key = {
  +$data?: SearchImage_imagePalette$data,
  +$fragmentRefs: SearchImage_imagePalette$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "SearchImage_imagePalette",
  "type": "ImagePalette",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "searchValue",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "imageSrc",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "palette",
      "storageKey": null,
      "args": null,
      "concreteType": "Palette",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "colorType",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "hex",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '49955c4a396f998154c40b96a438efa5';
module.exports = node;
