![zoho-node](https://monosnap.com/file/5S223w7651B8ksuXEFSrRH1tRwo1nS.png)

## Introduction

Node.js Zoho helper library for integrating Zoho Creator, CRM, Invoice and Support. 

- [![npm version](https://badge.fury.io/js/zoho.svg)](http://badge.fury.io/js/zoho)
- [![Build Status](https://travis-ci.org/4yopping/zoho.svg)](https://travis-ci.org/4yopping/zoho)
- [![Join the chat at https://gitter.im/4yopping/zoho](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/4yopping/zoho?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
- [![Inline docs](http://inch-ci.org/github/4yopping/zoho.svg?branch=master)](http://inch-ci.org/github/4yopping/zoho)

## Installation

```bash
$ npm install zoho
```

## Features

- **Zoho Creator**
- **Zoho CRM**
- **Zoho Invoice**
- **Zoho Support**

## API

#### `Zoho`

Initialize `zoho`

```js
var Zoho = require('zoho');
```

#### `Zoho#Creator(object)`

Initialize `Creator` with an object `authtoken`

```js
var creator = new Zoho.Creator({
  authtoken: 'bad18eba1ff45jk7858b8ae88a77fa30'
});
```

##### `viewRecordsInView(<string> applicationLinkName, <string> viewLinkName, <function> callback)`:

```js
creator.viewRecordsInView('sample','Employee_View', function (err, data) {
  if (err) {
    return console.log(err);
  }

  console.log(data);
});
```

##### `addRecords(<string> applicationLinkName, <string> formLinkName, <object> params, <function> callback)`

Add records.

See [https://www.zoho.com/creator/help/api/rest-api/rest-api-add-records.html](https://www.zoho.com/creator/help/api/rest-api/rest-api-add-records.html)

```js

```

##### `editRecords(<string> applicationLinkName, <string> formLinkName, <object> params, <function> callback)`

Edit records.

See [https://www.zoho.com/creator/help/api/rest-api/rest-api-edit-records.html](https://www.zoho.com/creator/help/api/rest-api/rest-api-edit-records.html)

```js

```

##### `deleteRecords(<string> applicationLinkName, <string> formLinkName, <object> params, <function> callback)`

Delete records.

See [https://www.zoho.com/creator/help/api/rest-api/rest-api-delete-records.html](https://www.zoho.com/creator/help/api/rest-api/rest-api-delete-records.html)

```js

```

##### `viewRecordsInView(<string> applicationLinkName, <string> formLinkName, <object> params, <function> callback)`

Get records in view.

See [https://www.zoho.com/creator/help/api/rest-api/rest-api-view-records-in-view.html](https://www.zoho.com/creator/help/api/rest-api/rest-api-view-records-in-view.html)

```js

```

##### `listFormFields(<string> applicationLinkName, <string> formLinkName, <object> params, <function> callback)`

List form fields.

See [https://www.zoho.com/creator/help/api/rest-api/rest-api-list-form-fields.html](https://www.zoho.com/creator/help/api/rest-api/rest-api-list-form-fields.html)

```js

```

#### `Zoho#CRM(object)`

Initialize `CRM` with an object `authtoken`

```js
var crm = new Zoho.CRM({
  authtoken: 'bad18eba1ff45jk7858b8ae88a77fa30'
});
```

##### `getRecords(<string> type, <function> callback)`:

```js
crm.getRecords('leads', function (err, data) {
  if (err) {
    return console.log(err);
  }

  console.log(data);
});
```

#### `Zoho#Invoice(object)`

Initialize `Invoice` with an object `authtoken`

```js
var invoice = new Zoho.Invoice({
  authtoken: 'bad18eba1ff45jk7858b8ae88a77fa30'
});
```

##### `getRecords(<string> type, <function> callback)`:

```js
invoice.getRecords('contacts', function (err, data) {
  if (err) {
    return console.log(err);
  }

  console.log(data);
});
```

#### `Zoho#Support(object)`

Initialize `Support` with an object `authtoken`

```js
var support = new Zoho.Support({
  authtoken: 'bad18eba1ff45jk7858b8ae88a77fa30'
});
```

##### `getRecords(<string> type, <function> callback)`:

```js
support.getRecords('contacts', function (err, data) {
  if (err) {
    return console.log(err);
  }

  console.log(data);
});
```

## Reference

* [Zoho Creator API](https://www.zoho.com/creator/help/api/rest-api/zoho-creator-rest-api.html)
* [Zoho CRM API](https://www.zoho.com/crm/help/api)
* [Zoho Invoice API](https://www.zoho.com/invoice/api/v3)
* [Zoho Support API Guide](https://www.zoho.com/support/help/api-guide.html)



##Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.


##Licence
The MIT License (MIT)

Copyright (c) 2015 Andrés González Aragón, 4yopping and all the related trademarks

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
