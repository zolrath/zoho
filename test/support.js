var assert = require('assert'),
    config = require('./config'),
    Zoho   = require('../lib');

var zohoSupport = new Zoho.Support(config.support);

// Zoho Support
describe('Zoho Support', function () {
  it('zohoSupport should be an instance of Zoho.Support', function () {
    assert(zohoSupport instanceof Zoho.Support);
  });

  it('zohoSupport should have this properties', function () {
    assert(zohoSupport.protocol);
    assert(zohoSupport.host);
    assert(zohoSupport.port);
    assert(zohoSupport.portal);
    assert(zohoSupport.department);
    assert(zohoSupport.authtoken);
    assert.equal(zohoSupport.portal, config.support.portal);
    assert.equal(zohoSupport.department, config.support.department);
    assert.equal(zohoSupport.authtoken, config.support.authtoken);
  });

  it('zohoSupport should have this public functions', function () {
    assert.equal(typeof zohoSupport.getRecords, 'function');
    assert.equal(typeof zohoSupport.getRecordById, 'function');
    assert.equal(typeof zohoSupport.createRecord, 'function');
    assert.equal(typeof zohoSupport.updateRecord, 'function');
    assert.equal(typeof zohoSupport.deleteRecord, 'function');
  });

  it('zohoSupport should have this private functions', function () {
    assert.equal(typeof zohoSupport._request, 'function');
  });
});
