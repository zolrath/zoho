var assert = require('assert'),
    sinon  = require('sinon'),
    faker  = require('faker'),
    libxml = require('libxmljs'),
    config = require('./config'),
    Zoho   = require('../lib');

var zohoCreator = new Zoho.Creator(config.creator);

// Zoho Creator
describe('Zoho Creator', function () {
  it('zohoCreator should be an instance of Zoho.Creator', function () {
    assert(zohoCreator instanceof Zoho.Creator);
  });

  it('zohoCreator should have this properties', function () {
    assert(zohoCreator.protocol);
    assert(zohoCreator.host);
    assert(zohoCreator.port);
    assert(zohoCreator.scope);
    assert(zohoCreator.authtoken);
    assert.equal(zohoCreator.scope, config.creator.scope);
    assert.equal(zohoCreator.authtoken, config.creator.authtoken);
  });

  it('zohoCreator should have this public functions', function () {
    assert.equal(typeof zohoCreator.addRecords, 'function');
    assert.equal(typeof zohoCreator.editRecords, 'function');
    assert.equal(typeof zohoCreator.deleteRecords, 'function');
    assert.equal(typeof zohoCreator.viewRecordsInView, 'function');
    assert.equal(typeof zohoCreator.listFormFields, 'function');
  });

  it('zohoCreator should have this private functions', function () {
    assert.equal(typeof zohoCreator._request, 'function');
    assert.equal(typeof zohoCreator._build, 'function');
  });

});

describe('Zoho Requests', function () {
  beforeEach(function () {
    this.callback = sinon.spy();
  });

  it('should be able to make requests to Zoho server', function (done) {
    zohoCreator._request('GET', 'fakeroute', {}, this.callback);

    setTimeout(function () {
      assert(this.calledOnce);

      var error = this.args[0][0], response = this.args[0][1];

      assert.equal(response, null);
      assert.equal(typeof error, 'object');
      assert.equal(error.code, 4600);
      assert(/Unable to process your request/.test(error.message));

      done();
    }.bind(this.callback), 1000);
  });
});
