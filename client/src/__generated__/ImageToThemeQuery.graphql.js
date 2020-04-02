/**
 * @flow
 * @relayHash 652c7c99e9a7409e5991dc53175d0d85
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type SearchImage_imagePalette$ref = any;
export type ImageToThemeQueryVariables = {|
  searchValue?: ?string
|};
export type ImageToThemeQueryResponse = {|
  +imagePalette: ?{|
    +randomWord: ?string,
    +$fragmentRefs: SearchImage_imagePalette$ref,
  |}
|};
export type ImageToThemeQuery = {|
  variables: ImageToThemeQueryVariables,
  response: ImageToThemeQueryResponse,
|};
*/


/*
query ImageToThemeQuery(
  $searchValue: String
) {
  imagePalette(searchValue: $searchValue) {
    randomWord
    ...SearchImage_imagePalette
  }
}

fragment SearchImage_imagePalette on ImagePalette {
  searchValue
  imageSrc
  palette {
    colorType
    hex
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "searchValue",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "searchValue",
    "variableName": "searchValue"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "randomWord",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ImageToThemeQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "imagePalette",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ImagePalette",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "FragmentSpread",
            "name": "SearchImage_imagePalette",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ImageToThemeQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "imagePalette",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ImagePalette",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ImageToThemeQuery",
    "id": null,
    "text": "query ImageToThemeQuery(\n  $searchValue: String\n) {\n  imagePalette(searchValue: $searchValue) {\n    randomWord\n    ...SearchImage_imagePalette\n  }\n}\n\nfragment SearchImage_imagePalette on ImagePalette {\n  searchValue\n  imageSrc\n  palette {\n    colorType\n    hex\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '48e70d90e13cc6f27be02565ec12ff2c';
module.exports = node;
