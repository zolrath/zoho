var assert = require('assert'),
    sinon  = require('sinon'),
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

  describe('Zoho Support Requests', function () {
    beforeEach(function () {
      this.callback = sinon.spy();
    });

    it('should be able to make requests to Zoho server', function (done) {
      zohoSupport._request('GET', 'fakeroute', {}, this.callback);

      setTimeout(function () {
        assert(this.calledOnce);

        var error = this.args[0][0], response = this.args[0][1];

        assert.equal(response, null); // No response
        assert.equal(typeof error, 'object'); // Found errors
        assert.equal(error.code, 1001);
        assert(/Unable to process your request/.test(error.message));

        done();
      }.bind(this.callback), 500);
    });
  });
});
