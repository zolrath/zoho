var assert = require('assert'),
    sinon  = require('sinon'),
    config = require('./config'),
    Zoho   = require('../lib');

var zohoInvoice = new Zoho.Invoice(config.invoice);

// Zoho
describe('Zoho', function () {
  it('Zoho should be a function', function () {
    assert.equal(typeof Zoho, 'function');
  });
});

// Zoho Invoice
describe('Zoho Invoice', function () {
  it('zohoInvoice should be an instance of Zoho.Invoice', function () {
    assert(zohoInvoice instanceof Zoho.Invoice);
  });

  it('zohoInvoice should have this properties', function () {
    assert(zohoInvoice.protocol);
    assert(zohoInvoice.host);
    assert(zohoInvoice.port);
    assert(zohoInvoice.authtoken);
    assert.equal(zohoInvoice.authtoken, config.invoice.authtoken);
  });
});
