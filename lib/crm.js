var qs    = require('qs'),
    http  = require('http'),
    https = require('https');

// CRM
var CRM = function (options) {
  options = options || {};

  this.protocol = options.protocol || 'https';
  this.host = options.host || 'crm.zoho.com';
  this.port = options.port || (this.protocol === 'https' ? 443 : 80);

  if (!options.authtoken) {
    return console.log('Error: Zoho CRM instance requires the parameter `authtoken` to be initialized correctly');
  }

  this.authtoken = options.authtoken;
  this.scope = options.scope || 'crmapi';
};

// Get Record
CRM.prototype.getRecords = function () {};

// Get Record By Id
CRM.prototype.getRecordById = function () {};

// Create Record
CRM.prototype.createRecord = function (module, params, callback) {
  params = params || {};

  if (typeof params !== 'object' || Object.keys(params).length === 0) {
    return callback({ message: 'Error: params object required to create record' }, null);
  }

  var records = params instanceof Array ? params : [params];

  var xml = '<' + module + '>';
  records.forEach(function (params, index) {
    xml += '<row no="' + (index + 1) + '">';
    for (var param in params) {
      if (params.hasOwnProperty(param)) {
        xml += '<FL val="' + param + '">' + params[param] + '</FL>';
      }
    }
    xml += '</row>';
  });
  xml += '</' + module + '>';

  module = module.charAt(0).toUpperCase() + module.slice(1);

  this._request('GET', module + '/insertRecords', { xmlData: xml }, callback);
};

// Update Record
CRM.prototype.updateRecord = function () {};

// Delete Record
CRM.prototype.deleteRecord = function () {};


/* Private functions */

// Request
CRM.prototype._request = function (method, endpoint, params, callback) {
  params = params || {};

  params.authtoken = this.authtoken;
  params.scope = this.scope;

  var options = {
    host: this.host,
    port: this.port,
    path: '/crm/private/json/' + endpoint + '?' + qs.stringify(params),
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
          var object = {};

          object.code = data.response.result.code || 0;
          object.data = data.response.result.recorddetail;

          return callback(null, object);
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

module.exports = CRM;
