'use strict'

const Metalsmith = require('metalsmith')
const collections = require('metalsmith-collections')
const { expect } = require('chai')
const { name } = require('../package.json')
const plugin = require('../lib/')

describe(name, () => {
  let metalsmith

  beforeEach(() => {
    metalsmith = Metalsmith('test/fixtures/basic/')
  })

  it('should apply limit to collection', done => {
    metalsmith
      .use(collections({ sortBy: 'path' }))
      .use(plugin({ articles: 1 }))
      .build(err => {
        if (err) return done(err)

        const { articles } = metalsmith.metadata()
        expect(articles).to.have.lengthOf(1)
        expect(articles.map(({ path }) => path)).to.eql(['alpha.md'])

        done()
      })
  })

  it('should apply limit > 1', done => {
    metalsmith
      .use(collections({ sortBy: 'path' }))
      .use(plugin({ articles: 2 }))
      .build(err => {
        if (err) return done(err)

        const { articles } = metalsmith.metadata()
        expect(articles).to.have.lengthOf(2)
        expect(articles.map(({ path }) => path)).to.eql(['alpha.md', 'beta.md'])

        done()
      })
  })

  it('should apply gracefully if limit is greater than collection length', done => {
    metalsmith
      .use(collections({ sortBy: 'path' }))
      .use(plugin({ articles: 5 }))
      .build(err => {
        if (err) return done(err)

        const { articles } = metalsmith.metadata()
        expect(articles).to.have.lengthOf(3)
        expect(articles.map(({ path }) => path)).to.eql(['alpha.md', 'beta.md', 'charlie.md'])

        done()
      })
  })

})
