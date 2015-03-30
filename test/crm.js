var assert = require('assert'),
    sinon  = require('sinon'),
    config = require('./config'),
    Zoho   = require('../lib');

var zohoCRM = new Zoho.CRM(config.crm);

// Zoho CRM
describe('Zoho CRM', function () {
  it('zohoCRM should be an instance of Zoho.CRM', function () {
    assert(zohoCRM instanceof Zoho.CRM);
  });

  it('zohoCRM should have this properties', function () {
    assert(zohoCRM.protocol);
    assert(zohoCRM.host);
    assert(zohoCRM.port);
    assert(zohoCRM.scope);
    assert(zohoCRM.authtoken);
    assert.equal(zohoCRM.scope, config.crm.scope);
    assert.equal(zohoCRM.authtoken, config.crm.authtoken);
  });

  it('zohoCRM should have this public functions', function () {
    assert.equal(typeof zohoCRM.getRecords, 'function');
    assert.equal(typeof zohoCRM.getRecordById, 'function');
    assert.equal(typeof zohoCRM.createRecord, 'function');
    assert.equal(typeof zohoCRM.updateRecord, 'function');
    assert.equal(typeof zohoCRM.deleteRecord, 'function');
  });

  it('zohoCRM should have this private functions', function () {
    assert.equal(typeof zohoCRM._request, 'function');
  });

  describe('Zoho Requests', function () {
    beforeEach(function () {
      this.callback = sinon.spy();
    });

    it('should be able to make requests to Zoho server', function (done) {
      zohoCRM._request('GET', 'fakeroute', {}, this.callback);

      setTimeout(function () {
        assert(this.calledOnce);

        var error = this.args[0][0], response = this.args[0][1];

        assert.equal(response, null);
        assert.equal(typeof error, 'object');
        assert.equal(error.code, 4600);
        assert(/Unable to process your request/.test(error.message));

        done();
      }.bind(this.callback), 500);
    });
  });
});
