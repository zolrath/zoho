var config = require('rc')('test', {
  invoice: {
    authtoken: 'bad18eba1ff45jk7858b8ae88a77fa30'
  },
  support: {
    authtoken: 'bad18eba1ff45jk7858b8ae88a77fa30',
    portal: '4yopping',
    department: '4yopping'
  }
});

module.exports = config;
