'use strict'

const debug = require('debug')('metalsmith-collections-limit')

module.exports = opts => ((files, metalsmith, done) => {
  const metadata = metalsmith.metadata()
  const keys = Object.keys(opts)

  keys.forEach(key => {
    debug(`limiting collection: ${key}`)
    metadata[key] = metadata[key].slice(0, opts[key])
  })

  done()
})
