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
Support.prototype._request = function () {};


module.exports = Support;
