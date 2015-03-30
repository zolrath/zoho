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
CRM.prototype.createRecord = function () {};

// Update Record
CRM.prototype.updateRecord = function () {};

// Delete Record
CRM.prototype.deleteRecord = function () {};


/* Private functions */

// Request
CRM.prototype._request = function () {};

module.exports = CRM;
