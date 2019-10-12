// routes home.js

// import package
// ==============================

const express = require('express')
const router = express.Router()
const randomstring = require("randomstring")
const Link = require('../models/link.js')


// routes '/'
// ==============================

router.get('/', (req, res) => res.render('index'))

router.post('/', (req, res) => {
  console.log('input', req.body)
  const input = req.body.url

  // 檢查 input
  if (!input) return res.render('index', { error: '不得為空' })

  // 生成短網址
  const short = randomstring.generate(5)

  // save to database
  const newLink = new Link({
    short: short,
    url: /^https?:\/\//.test(input) ? input.split('//')[1] : input,
    ssl: /^https/.test(input)
  })
  newLink.save()

  console.log(newLink)
  res.render('index', { short })
})

router.get('/links/:short', (req, res) => {
  const short = req.params.url

  // Query
  // Link.findOne({ short }, link => {...})
  const protocol = link.ssl ? 'https://' : 'http://'
  const url = link.url

  console.log('target', protocol + url)
  res.redirect(protocol + url)
})

// export
// ==============================

module.exports = router