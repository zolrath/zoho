var config = require('rc')('test', {
  invoice: {
    authtoken: process.env.ZOHO_INVOICE_TOKEN || 'YouCanPutYourZohoInvoiceTokenHere'
  },
  support: {
    authtoken: process.env.ZOHO_SUPPORT_TOKEN || 'YouCanPutYourZohoSupportTokenHere',
    portal: '4yopping',
    department: '4yopping'
  }
});

module.exports = config;
