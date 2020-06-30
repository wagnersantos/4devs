const cypressTypeScriptPreporcessor = require('./cy-ts-preprocessor')

module.exports = (on, config) => {
  on('file:preprocessor', cypressTypeScriptPreporcessor)
}
