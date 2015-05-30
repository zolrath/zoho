var qs    = require('qs'),
    http  = require('http'),
    https = require('https');

// CRM
var Creator = function (options) {
  options = options || {};

  this.protocol = options.protocol || 'https';
  this.host = options.host || 'creator.zoho.com';
  this.port = options.port || (this.protocol === 'https' ? 443 : 80);

  if (!options.authtoken) {
    return console.log('Error: Zoho Creator instance requires the parameter `authtoken` to be initialized correctly');
  }

  this.authtoken = options.authtoken;
  this.scope = options.scope || 'creatorapi';
};

// Add Records
// See https://www.zoho.com/creator/help/api/rest-api/rest-api-add-records.html
Creator.prototype.addRecords = function (applicationName, formName, params, callback) {
  params = params || {};

  module = module.charAt(0).toUpperCase() + module.slice(1);

  var endpoint = applicationName + '/form/'+formName+'/record/add/';

  if (typeof params === 'function') {
    this._request('POST', endpoint, {}, params);
  } else {
    this._request('POST', endpoint, params, callback);
  }
};

// Edit Records
// See https://www.zoho.com/creator/help/api/rest-api/rest-api-edit-records.html
Creator.prototype.editRecords = function (applicationName, formName, params, callback) {
  params = params || {};

  module = module.charAt(0).toUpperCase() + module.slice(1);

  var endpoint = applicationName + '/form/'+formName+'/record/update/';

  if (typeof params === 'function') {
    this._request('POST', endpoint, {}, params);
  } else {
    this._request('POST', endpoint, params, callback);
  }
};

// Delete Records
// See https://www.zoho.com/creator/help/api/rest-api/rest-api-delete-records.html
Creator.prototype.deleteRecords = function (applicationName, formName, params, callback) {
  params = params || {};

  module = module.charAt(0).toUpperCase() + module.slice(1);

  var endpoint = applicationName + '/form/'+formName+'/record/delete/';

  if (typeof params === 'function') {
    this._request('POST', endpoint, {}, params);
  } else {
    this._request('POST', endpoint, params, callback);
  }
};

// Get Records in View
// See https://www.zoho.com/creator/help/api/rest-api/rest-api-view-records-in-view.html
Creator.prototype.viewRecordsInView = function (applicationLinkName, viewLinkName, params, callback) {
  params = params || {};

  module = module.charAt(0).toUpperCase() + module.slice(1);

  var endpoint = '/'+params.format||'json'+'/'+applicationLinkName + '/view/'+viewLinkName;

  if (typeof params === 'function') {
    this._request('GET', endpoint, {}, params);
  } else {
    this._request('GET', endpoint, params, callback);
  }
};

// Get Records in View
// See https://www.zoho.com/creator/help/api/rest-api/rest-api-list-form-fields.html
Creator.prototype.listFormFields = function (applicationLinkName, viewLinkName, params, callback) {
  params = params || {};

  module = module.charAt(0).toUpperCase() + module.slice(1);

  var endpoint = applicationLinkName + '/view/'+viewLinkName;

  if (typeof params === 'function') {
    this._request('GET', endpoint, {}, params);
  } else {
    this._request('GET', endpoint, params, callback);
  }
};


/* Private functions */

// Build XML data
Creator.prototype._build = function (module, data) {
  var records = data instanceof Array ? data : [data];

  var xml = '<' + module + '>';
  records.forEach(function (params, index) {
    xml += '<row no="' + (index + 1) + '">';
    for (var param in params) {
      if (params.hasOwnProperty(param)) {
        xml += '<FL val="' + param + '"><![CDATA[' + params[param] + ']]></FL>';
      }
    }
    xml += '</row>';
  });
  xml += '</' + module + '>';

  return xml;
};

// Request
Creator.prototype._request = function (method, endpoint, params, callback) {
  params = params || {};

  params.authtoken = this.authtoken;
  params.scope = this.scope;

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
          var object = {};

          object.code = data.response.result.code || 0;
          object.data = data.response.result.recorddetail;
          object.data = object.data || data.response.result;

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

module.exports = Creator;
