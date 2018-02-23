# contentid

Routines for handling contentId for TagCloud content ingestion.

## Install

```npm install contentid --save```

## Usage

```js
const contentid = require('contentid');

/*
 * Make a string "URL safe" by doing the following:
 * 1) trim the string
 * 2) replace '~' with '__'
 * 3) remove anything else than [A-Za-z0-9-_.] and change the subsequent component to camelCase, e.g. 'a b' => 'aB'
 *
 * If the parameter is not a string but has toString(), call it then escape.
 */
contentid.escape('  abc abc-abc_abc.abc~abc');
//=> 'abcAbc-abc_abc.abc__abc'

/*
 * Concatenate the three components with '~' as the separator. Escape the middle one. If the last one is a number,
 * add zero left-padding to 11 digits
 */
contentid.assemble('source', 'provider name', 'articleId');
//=> 'source~providerName~articleId'

contentid.assemble('source', 'provider name', 12345);
//=> 'source~providerName~00000012345'
```

## License

MIT © [Ringier AG](http://www.ringier.com)
