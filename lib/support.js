var qs    = require('qs'),
    http  = require('http'),
    https = require('https');

// Support
var Support = function (options) {
  options = options || {};

  this.protocol = options.protocol || 'https';
  this.host = options.host || 'support.zoho.com';
  this.port = options.port || (this.protocol === 'https' ? 443 : 80);

  if (!options.authtoken) {
    return console.log('Error: Zoho Support instance requires the parameter `authtoken` to be initialized correctly');
  }

  if (!options.portal) {
    return console.log('Error: Zoho Support instance requires the parameter `portal` to be initialized correctly');
  }

  if (!options.department) {
    return console.log('Error: Zoho Support instance requires the parameter `department` to be initialized correctly');
  }

  this.authtoken = options.authtoken;
  this.portal = options.portal;
  this.department = options.department;
};

// Create Record
Support.prototype.createRecord = function () {};

// Get Records
Support.prototype.getRecords = function () {};

// Get Record By Id
Support.prototype.getRecordById = function () {};

// Update Record
Support.prototype.updateRecord = function () {};

// Delete Record
Support.prototype.deleteRecord = function () {};

/* Private functions */

// Request
Support.prototype._request = function (method, endpoint, params, callback) {
  params = params || {};

  params.portal = this.portal;
  params.authtoken = this.authtoken;
  params.department = this.department;

  var options = {
    host: this.host,
    port: this.port,
    path: '/api/json/' + endpoint + '?' + qs.stringify(params),
    method: method,
    headers: {
      'Content-Length': JSON.stringify(params).length
    }
  };

  var protocol = this.protocol === 'https' ? https : http;

  var req = protocol.request(options, function (res) {
    var data = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) { data += chunk; });
    res.on('end', function () {
      if (data) {
        data = JSON.parse(data);

        if (data.response.error) {
          return callback({
            code: data.response.error.code,
            message: data.response.error.message
          }, null);
        } else {
          return callback(null, data);
        }
      }

      return callback({ message: 'No content data' }, null);
    });
  });

  req.on('error', function (e) {
    return callback(e, null);
  });

  req.write(JSON.stringify(params));
  req.end();
};


module.exports = Support;
