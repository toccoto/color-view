/**
 * @flow
 * @relayHash 1b2b3f84549419077b3e0b12d9479abd
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type SearchImage_imagePalette$ref = any;
export type AppQueryVariables = {|
  searchValue?: ?string
|};
export type AppQueryResponse = {|
  +imagePalette: ?{|
    +$fragmentRefs: SearchImage_imagePalette$ref
  |}
|};
export type AppQuery = {|
  variables: AppQueryVariables,
  response: AppQueryResponse,
|};
*/


/*
query AppQuery(
  $searchValue: String
) {
  imagePalette(searchValue: $searchValue) {
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
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "AppQuery",
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
    "name": "AppQuery",
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
    "name": "AppQuery",
    "id": null,
    "text": "query AppQuery(\n  $searchValue: String\n) {\n  imagePalette(searchValue: $searchValue) {\n    ...SearchImage_imagePalette\n  }\n}\n\nfragment SearchImage_imagePalette on ImagePalette {\n  searchValue\n  imageSrc\n  palette {\n    colorType\n    hex\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '186f940850bc5e9a10a25519942be858';
module.exports = node;
