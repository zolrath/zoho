# Zoho

Simplest Zoho integrations for Node.js. Simple REST API wrappers.

## Installation

```bash
$ npm install zoho
```

## Example

```js
var Zoho = require('zoho');

var invoice = new Zoho.Invoice({
  authtoken: 'bad18eba1ff45jk7858b8ae88a77fa30'
});

invoice.getRecords('contacts', function (err, data) {
  if (err) {
    return console.log(err);
  }
  
  console.log(data);
});

```

## Supports

* ~~Zoho CRM~~
* Zoho Invoice
* ~~Zoho Support~~

## Reference

* [Zoho CRM API](https://www.zoho.com/crm/help/api)
* [Zoho Invoice API](https://www.zoho.com/invoice/api/v3)
* [Zoho Support API Guide](https://www.zoho.com/support/help/api-guide.html)

