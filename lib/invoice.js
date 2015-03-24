var Invoice = function (options) {
  options = options || {};

  if (!options.authtoken) {
    return console.log('Error: Zoho Invoice instance requires the parameter `authtoken` to be initialized correctly');
  }

  this.authtoken = options.authtoken;
};

module.exports = Invoice;
