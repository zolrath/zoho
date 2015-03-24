var Invoice = function (options) {
  options = options || {};

  this.protocol = options.protocol || 'https';
  this.host = options.host || 'invoice.zoho.com';
  this.port = options.port || (this.protocol === 'https' ? 443 : 80);

  if (!options.authtoken) {
    return console.log('Error: Zoho Invoice instance requires the parameter `authtoken` to be initialized correctly');
  }

  this.authtoken = options.authtoken;
};

module.exports = Invoice;
