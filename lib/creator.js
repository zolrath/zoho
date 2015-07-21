var qs    = require('qs'),
    fs    = require('fs'),
    http  = require('http'),
    https = require('https'),
    querystring = require('querystring');

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

  var endpoint = applicationName + '/form/'+formName+'/record/update/';
  
  console.log(endpoint);

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

  var endpoint = applicationLinkName + '/view/'+viewLinkName;

  if (typeof params === 'function') {
    this._request('GET', endpoint, {}, params);
  } else {
    this._request('GET', endpoint, params, callback);
  }
};

// List records in view
// See https://www.zoho.com/creator/help/api/rest-api/rest-api-list-form-fields.html
Creator.prototype.listFormFields = function (applicationLinkName, viewLinkName, params, callback) {
  params = params || {};

  var endpoint = applicationLinkName + '/view/'+viewLinkName;

  if (typeof params === 'function') {
    this._request('GET', endpoint, {}, params);
  } else {
    this._request('GET', endpoint, params, callback);
  }
};

// Get image
// Zoho doesn't support downloading images from the REST API.  But, images are accessible against a hardcoded URL 
Creator.prototype.downloadImage = function (endpoint, params, callback) {
  var params = params || {};
  
  this.host = 'creatorexport.zoho.com';
  
  params.download = true;
  
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
  params.raw = true;
    
  var path = (params.hasOwnProperty('download')) ? endpoint + '?' + qs.stringify(params) : '/api/json/' + endpoint + '?' + querystring.unescape(qs.stringify(params));
  delete params.path;
  
  var options = {
    host: this.host,
    port: this.port,
    path: path,
    method: method,
    headers: {
      'Content-Length': JSON.stringify(params).length
    }
  };
  
  options.headers['Cookie'] = 'km_ai=E2jecJDAiOaNTNLO%2FfJZe5ukCjs%3D; km_lv=x; km_uq=; _ga=GA1.2.1236750411.1426822691; dcl_pfx=us; 0de0086ea2=c1992ee0f40e3a3ec3b5279fe7ceccc8; IAMAGENTTICKET=bcabc438dd2e1b83d0031bf6d2c8c2a8; IAMAGENTTICKET_un="tickotimejewelry@gmail.com"; zidp=P; _mkto_trk=id:127-GRI-621&token:_mch-zoho.com-1426876718298-79743; zccpn=c0d6a7abedba8dff027337fd1fd0b7fa7ee6330a351ace550aa48a2955e4c8be3e1ce5397183c0c8bf1b41c118215c7733468b03f3d4b6f4f1a50486265daf2e; IAMAGENTTICKET_secureonly=true; __utma=168905406.1236750411.1426822691.1437293351.1437317233.36; __utmc=168905406; __utmz=168905406.1437244080.31.5.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); __unam=659067b-14c388102b5-bb5d140-153; JSESSIONID=833CD263CB9F27B5FC052201C4F71229';
  //options.headers['Connection'] = "keep-alive";
  
  if (params.hasOwnProperty('download')) {
    options.headers['Content-disposition'] = 'attachment; filename=1427150341594_image.JPG';
    options.headers['Content-type'] = 'image/jpeg';  
  }
      
  var protocol = this.protocol === 'https' ? https : http;

  var req = protocol.request(options, function (res) {
            
    var chunks = [];
    
    if (params.hasOwnProperty('download')) {
      res.setEncoding('binary');

    } else {
      res.setEncoding('utf8');
    }
    
    res.on('data', function (chunk) { 
      chunks.push(new Buffer(chunk, "binary"));
    });
    res.on('end', function () {
      //var buffer = new Buffer();
      var data = Buffer.concat(chunks);
      if (data) {
        if (params.hasOwnProperty('download')) {
          // binary
          return callback(null, data);
        } else {
          
          // json
          try {
            data = JSON.parse(data);
          }catch(e) {
            data = {};
          }

          if (data.message) {
            return callback({
              code: data.code,
              message: data.message
            }, null);
          } else {
            return callback(null, data);
          }
          
        }

      } else {
        return callback({ message: 'No content data' }, null); 
      }

    });
  });

  req.on('error', function (e) {
    return callback(e, null);
  });

  req.write(JSON.stringify(params));
  req.end();
};

module.exports = Creator;
