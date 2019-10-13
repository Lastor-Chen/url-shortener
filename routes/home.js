// routes home.js

// import package
// ==============================

const express = require('express')
const router = express.Router()
const randomstring = require('randomstring')
const Link = require('../models/link.js')

// custom module
const { checkFormat, hasSSL } = require('../lib/urlChecker.js')

// routes '/'
// ==============================

// prevent browser default request /favicon.ico
router.get('/favicon.ico', (req, res) => res.status(204))

router.get('/', (req, res) => res.render('index'))

router.post('/', async (req, res) => {
  const input = req.body.url
  if (!input) return res.render('index', { error: 'Please provide a valid URL' })

  const url = checkFormat(input)
  const protocol = hasSSL(input)
  let short = randomstring.generate(5)
  let links = []
  try { links = await Link.find({ $or: [{ short: short }, { url: url, ssl: protocol }] }).limit(2).exec() }
  catch (err) { console.error(err) }

  // 確認 url 是否已存在
  const resURL = links.find(link => link.url === url)
  if (resURL) return res.render('index', { short: resURL.short, input })
  
  // 確認 short 是否已存在
  while ( links.some(link => link.short === short) ) {
    short = randomstring.generate(5)
  }
  
  // save to database
  Link.create({ short: short, url: url, ssl: protocol })
    .then(link => res.render('index', { short, input }))
    .catch(err => res.status(422).json(err))
})

router.get('/:short', (req, res) => {
  const short = req.params.short

  Link.findOne({ short: short })
    .then(link => {
      const protocol = link.ssl ? 'https://' : 'http://'
      const url = link.url
      res.redirect(protocol + url)
    })
    .catch(err => res.render('index', { error: `"${short}" is not a valid short URL` }))
})


// export
// ==============================

module.exports = router