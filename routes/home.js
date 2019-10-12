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

router.get('/', (req, res) => res.render('index'))

router.post('/', async (req, res) => {
  console.log('input', req.body)
  const input = req.body.url
  if (!input) return res.render('index', { error: 'Please provide a valid URL' })

  // 生成短網址
  let short = ''
  while (true) {
    short = randomstring.generate(5)
    const isExist = await Link.findOne({ short: short }).exec()
    console.log('loop', isExist)
    if (!isExist) { break }
  }
  
  // save to database
  const newLink = new Link({
    short: short,
    url: checkFormat(input),
    ssl: hasSSL(input)
  })

  newLink.save()
    .then(link => {
      console.log('save', link)
      res.render('index', { short, input })
    })
    .catch(err => res.status(422).json(err))
})

router.get('/:short', (req, res) => {
  const short = req.params.short
  console.log('short', short)

  Link.findOne({ short: short })
    .then(link => {
      const protocol = link.ssl ? 'https://' : 'http://'
      const url = link.url
      console.log('target', protocol + url)
      res.redirect(protocol + url)
    })
    .catch(err => {
      res.render('index', { error: `"${short}" is not a valid short URL` })
    })
})


// export
// ==============================

module.exports = router