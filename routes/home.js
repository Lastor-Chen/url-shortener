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

router.post('/', (req, res) => {
  console.log('input', req.body)
  const input = req.body.url
  if (!input) return res.render('index', { error: '不得為空' })

  // 生成短網址
  const short = randomstring.generate(5)

  // save to database
  const newLink = new Link({
    short: short,
    url: checkFormat(input),
    ssl: hasSSL(input)
  })

  newLink.save()
    .then(link => {
      console.log(link)
      res.render('index', { short })
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
      res.render('index', { error: `無效的短網址 => /${short}` })
    })
})


// export
// ==============================

module.exports = router