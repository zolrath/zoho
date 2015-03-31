var assert = require('assert'),
    sinon  = require('sinon'),
    faker  = require('faker'),
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

  // To assign created id;
  var created_id;

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
      }.bind(this.callback), 1000);
    });
  });

  describe('Create Zoho CRM records', function () {
    beforeEach(function () {
      this.params = {
        'First Name': faker.name.firstName(),
        'Last Name': faker.name.lastName(),
        Company: faker.company.companyName()
      };
      this.callback = sinon.spy();
    });

    it('should fail when trying to create a lead without params', function () {
      zohoCRM.createRecord('leads', undefined, this.callback);
      assert(this.callback.calledOnce);
      assert.notEqual(this.callback.args[0][0], null);
      zohoCRM.createRecord('leads', {}, this.callback);
      assert(this.callback.calledTwice);
      assert.notEqual(this.callback.args[1][0], null);
      zohoCRM.createRecord('leads', [], this.callback);
      assert(this.callback.calledThrice);
      assert.notEqual(this.callback.args[2][0], null);
      zohoCRM.createRecord('leads', null, this.callback);
      assert.notEqual(this.callback.args[3][0], null);
    });

    it('should create a lead', function (done) {
      zohoCRM.createRecord('leads', this.params, this.callback);

      setTimeout(function () {
        assert(this.calledOnce);

        var error = this.args[0][0], response = this.args[0][1];

        assert.equal(error, null);
        assert.equal(typeof response, 'object');
        assert.equal(response.code, 0);

        created_id = response.data.FL[0].content;

        done();
      }.bind(this.callback), 1000);
    });

    it('should create multiple leads', function (done) {
      zohoCRM.createRecord('leads', [
        {
          'First Name': faker.name.firstName(),
          'Last Name': faker.name.lastName(),
          Company: faker.company.companyName()
        },
        {
          'First Name': faker.name.firstName(),
          'Last Name': faker.name.lastName(),
          Company: faker.company.companyName()
        }
      ], this.callback);

      setTimeout(function () {
        assert(this.calledOnce);

        var error = this.args[0][0], response = this.args[0][1];

        assert.equal(error, null);
        assert.equal(typeof response, 'object');
        assert.equal(response.code, 0);

        response.data.forEach(function (record) {
          zohoCRM.deleteRecord('leads', record.FL[0].content, function () {});
        });

        done();
      }.bind(this.callback), 1000);
    });
  });

  describe('Get Zoho CRM records', function () {
    beforeEach(function () {
      this.callback = sinon.spy();
    });

    it('should get leads with params argument', function (done) {
      zohoCRM.getRecords('leads', {}, this.callback);

      setTimeout(function () {
        assert(this.calledOnce);

        var error = this.args[0][0], response = this.args[0][1];

        assert.equal(error, null);
        assert.equal(typeof response, 'object');
        assert.equal(response.code, 0);
        assert(response.data.Leads.row);

        done();
      }.bind(this.callback), 1000);
    });

    it('should get leads without params argument', function (done) {
      zohoCRM.getRecords('leads', this.callback);

      setTimeout(function () {
        assert(this.calledOnce);

        var error = this.args[0][0], response = this.args[0][1];

        assert.equal(error, null);
        assert.equal(typeof response, 'object');
        assert.equal(response.code, 0);
        assert(response.data.Leads.row);

        done();
      }.bind(this.callback), 1000);
    });

    it('should fail when trying get a lead without id property', function () {
      zohoCRM.getRecordById('leads', { id: undefined }, this.callback);
      assert(this.callback.calledOnce);
      assert.notEqual(this.callback.args[0][0], null);
      zohoCRM.getRecordById('leads', undefined, this.callback);
      assert(this.callback.calledTwice);
      assert.notEqual(this.callback.args[1][0], null);
      zohoCRM.getRecordById('leads', {}, this.callback);
      assert(this.callback.calledThrice);
      assert.notEqual(this.callback.args[2][0], null);
      zohoCRM.getRecordById('leads', null, this.callback);
      assert.notEqual(this.callback.args[3][0], null);
    });

    it('should get a lead by id', function (done) {
      zohoCRM.getRecordById('leads', { id: created_id }, this.callback);

      setTimeout(function () {
        assert(this.calledOnce);

        var error = this.args[0][0], response = this.args[0][1];

        assert.equal(error, null);
        assert.equal(typeof response, 'object');
        assert.equal(response.code, 0);
        assert(response.data.Leads.row);

        done();
      }.bind(this.callback), 1000);
    });
  });

  describe('Update Zoho CRM records', function () {
    beforeEach(function () {
      this.params = {
        'First Name': faker.name.firstName(),
        'Last Name': faker.name.lastName(),
        Company: faker.company.companyName()
      };
      this.callback = sinon.spy();
    });

    it('should fail when trying update a lead with id param missing', function () {
      zohoCRM.updateRecord('leads', undefined, this.params, this.callback);
      assert(this.callback.calledOnce);
      assert.notEqual(this.callback.args[0][0], null);
      zohoCRM.updateRecord('leads', {}, this.params, this.callback);
      assert(this.callback.calledTwice);
      assert.notEqual(this.callback.args[1][0], null);
      zohoCRM.updateRecord('leads', null, this.params, this.callback);
      assert(this.callback.calledThrice);
      assert.notEqual(this.callback.args[2][0], null);
    });

    it('should fail when trying to update an account without params', function () {
      zohoCRM.updateRecord('leads', created_id, undefined, this.callback);
      assert(this.callback.calledOnce);
      assert.notEqual(this.callback.args[0][0], null);
      zohoCRM.updateRecord('leads', created_id, {}, this.callback);
      assert(this.callback.calledTwice);
      assert.notEqual(this.callback.args[1][0], null);
      zohoCRM.updateRecord('leads', created_id, null, this.callback);
      assert(this.callback.calledThrice);
      assert.notEqual(this.callback.args[2][0], null);
    });

    it('should update a lead', function (done) {
      zohoCRM.updateRecord('leads', created_id, this.params, this.callback);

      setTimeout(function () {
        assert(this.calledOnce);

        var error = this.args[0][0], response = this.args[0][1];

        assert.equal(error, null);
        assert.equal(typeof response, 'object');
        assert.equal(response.code, 0);

        done();
      }.bind(this.callback), 1000);
    });
  });

  describe('Delete Zoho CRM records', function () {
    beforeEach(function () {
      this.callback = sinon.spy();
    });

    it('should fail when trying delete a lead with id param missing', function () {
      zohoCRM.deleteRecord('leads', undefined, this.callback);
      assert(this.callback.calledOnce);
      assert.notEqual(this.callback.args[0][0], null);
      zohoCRM.deleteRecord('leads', {}, this.callback);
      assert(this.callback.calledTwice);
      assert.notEqual(this.callback.args[1][0], null);
      zohoCRM.deleteRecord('leads', null, this.callback);
      assert(this.callback.calledThrice);
      assert.notEqual(this.callback.args[2][0], null);
    });

    it('should delete a lead', function (done) {
      zohoCRM.deleteRecord('leads', created_id, this.callback);

      setTimeout(function () {
        assert(this.calledOnce);

        var error = this.args[0][0], response = this.args[0][1];

        assert.equal(error, null);
        assert.equal(typeof response, 'object');
        assert.equal(response.code, 5000);

        done();
      }.bind(this.callback), 1000);
    });
  });
});
