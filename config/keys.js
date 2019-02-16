if (process.env.NODE_ENV === 'production') {
  // prod env
  module.exports = require('./prod');
} else {
  // dev env
  module.exports = require('./dev');
}
