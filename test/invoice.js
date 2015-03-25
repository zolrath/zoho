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

  // To assign created id;
  var created_id;

  describe('Zoho Requests', function () {
    beforeEach(function () {
      this.callback = sinon.spy();
    });

    it('should be able to make requests to Zoho server', function (done) {
      zohoInvoice._request('GET', 'fakeroute', {}, this.callback);

      setTimeout(function () {
        assert(this.calledOnce);

        var error = this.args[0][0],
            response = this.args[0][1];

        assert.equal(error, null); // No response errors
        assert.equal(typeof response, 'object'); // Response
        assert.equal(response.code, 5); // Invalid URL Passed
        assert.equal(response.message, 'Invalid URL Passed');

        done();
      }.bind(this.callback), 500);
    });
  });

  describe('Create Zoho Invoice records', function () {
    beforeEach(function () {
      this.callback = sinon.spy();
    });

    it('should create a contact', function (done) {
      var params = { contact_name: '4yopping' };
      zohoInvoice.createRecord('contacts', params, this.callback);

      setTimeout(function () {
        assert(this.calledOnce);

        var error = this.args[0][0],
            response = this.args[0][1];


        assert.equal(error, null); // No response errors
        assert.equal(typeof response, 'object'); // Response
        assert.equal(response.code, 0); // No errors

        created_id = response.contact.contact_id;

        done();
      }.bind(this.callback), 500);
    });

    it('should fail when trying to create a contact without params', function (done) {
      zohoInvoice.createRecord('contacts', {}, this.callback);

      setTimeout(function () {
        assert(this.calledOnce);

        var error = this.args[0][0],
            response = this.args[0][1];

        assert.equal(error, null); // No response errors
        assert.equal(typeof response, 'object'); // Response
        assert.notEqual(response.code, 0); // Error from Zoho

        done();
      }.bind(this.callback), 500);
    });
  });

  describe('Get Zoho Invoice records', function () {
    beforeEach(function () {
      this.callback = sinon.spy();
    });

    it('should get contacts with params argument', function (done) {
      zohoInvoice.getRecords('contacts', {}, this.callback);

      setTimeout(function () {
        assert(this.calledOnce);

        var error = this.args[0][0],
            response = this.args[0][1];

        assert.equal(error, null); // No response errors
        assert.equal(typeof response, 'object'); // Response
        assert.equal(response.code, 0); // No errors

        done();
      }.bind(this.callback), 500);
    });

    it('should get contacts without params argument', function (done) {
      zohoInvoice.getRecords('contacts', this.callback);

      setTimeout(function () {
        assert(this.calledOnce);

        var error = this.args[0][0],
            response = this.args[0][1];

        assert.equal(error, null); // No response errors
        assert.equal(typeof response, 'object'); // Response
        assert.equal(response.code, 0); // No errors

        done();
      }.bind(this.callback), 500);
    });
  });

  describe('Delete Zoho Invoice records', function () {
    beforeEach(function () {
      this.callback = sinon.spy();
    });

    it('should delete a contact', function (done) {
      zohoInvoice.deleteRecord('contacts', created_id, this.callback);

      setTimeout(function () {
        assert(this.calledOnce);

        var error = this.args[0][0],
            response = this.args[0][1];

        assert.equal(error, null); // No response errors
        assert.equal(typeof response, 'object'); // Response
        assert.equal(response.code, 0); // No errors

        done();
      }.bind(this.callback), 500);
    });

    it('should fail when trying delete a contact with id param missing', function () {
      zohoInvoice.deleteRecord('contacts', undefined, this.callback);
      assert(this.callback.calledOnce);
      assert.notEqual(this.callback.args[0][0], null);
      zohoInvoice.deleteRecord('contacts', {}, this.callback);
      assert(this.callback.calledTwice);
      assert.notEqual(this.callback.args[1][0], null);
      zohoInvoice.deleteRecord('contacts', null, this.callback);
      assert(this.callback.calledThrice);
      assert.notEqual(this.callback.args[2][0], null);
    });

  });
});
