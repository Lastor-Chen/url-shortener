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
  console.log('input', req.body)
  const input = req.body.url
  if (!input) return res.render('index', { error: 'Please provide a valid URL' })

  // 確認 url 是否已存在
  const url = checkFormat(input)
  const resURL = await Link.findOne({ url: url }).exec()
  console.log('query url', resURL)
  if (resURL) return res.render('index', { short: resURL.short, input })

  // 生成短網址
  let short = ''
  while (true) {
    short = randomstring.generate(5)
    const isExist = await Link.findOne({ short: short }).exec()
    console.log('short', short)
    console.log('query short', isExist)
    if (!isExist) { break }
  }
  
  // save to database
  const newLink = new Link({
    short: short,
    url: url,
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