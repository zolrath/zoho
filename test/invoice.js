var assert = require('assert'),
    sinon  = require('sinon'),
    config = require('./config'),
    Zoho   = require('../lib');

var zohoInvoice = new Zoho.Invoice(config.invoice);

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

  it('zohoInvoice should have this public functions', function () {
    assert.equal(typeof zohoInvoice.getRecords, 'function');
    assert.equal(typeof zohoInvoice.getRecordById, 'function');
    assert.equal(typeof zohoInvoice.createRecord, 'function');
    assert.equal(typeof zohoInvoice.deleteRecord, 'function');
  });

  it('zohoInvoice should have this private functions', function () {
    assert.equal(typeof zohoInvoice._request, 'function');
  });

  describe('Zoho Requests', function () {
    beforeEach(function () {
      this.callback = sinon.spy();
    });

    it('should be able to make requests to Zoho server', function () {
      zohoInvoice._request('GET', 'fakeroute', {}, this.callback);

      setTimeout(function () {
        assert(this.calledOnce);

        var error = this.args[0][0],
            response = this.args[0][1];

        assert.equal(error, null); // No response errors
        assert.equal(typeof response, 'object'); // Response
        assert.equal(response.code, 5); // Invalid URL Passed
        assert.equal(response.message, 'Invalid URL Passed');
      }.bind(this.callback), 100);
    });
  });

  describe('Create Zoho Invoice records', function () {
    beforeEach(function () {
      this.callback = sinon.spy();
    });

    it('should create a contact', function () {
      var params = { contact_name: '4yopping' };
      zohoInvoice.createRecord('contacts', params, this.callback);
      assert(this.callback.calledOnce);

      var error = this.callback.args[0][0],
          response = this.callback.args[0][1];

      assert.equal(error, null); // No response errors
      assert.equal(typeof response, 'object'); // Response
      assert.equal(response.code, 0); // No errors
    });

    it('should fail when trying to create a contact without params', function () {
      zohoInvoice.createRecord('contacts', {}, this.callback);
      assert(this.callback.calledOnce);

      var error = this.callback.args[0][0],
          response = this.callback.args[0][1];

      assert.equal(error, null); // No response errors
      assert.equal(typeof response, 'object'); // Response
      assert.notEqual(response.code, 0); // Error from Zoho
    });
  });

  describe('Get Zoho Invoice records', function () {
    beforeEach(function () {
      this.callback = sinon.spy();
    });

    it('should get contacts with params argument', function () {
      zohoInvoice.getRecords('contacts', {}, this.callback);
      assert(this.callback.calledOnce);
    });

    it('should get contacts without params argument', function () {
      zohoInvoice.getRecords('contacts', this.callback);
      assert(this.callback.calledOnce);
    });
  });
});
