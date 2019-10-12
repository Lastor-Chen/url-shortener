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
  const input = req.body.url
  console.log('input', input)

  // 檢查 input
  if (!input) return res.render('index', { error: '不得為空' })

  // 生成短網址
  const short = randomstring.generate(5)

  // save to database
  link.short = short
  link.url = /^https?:\/\//.test(input) ? input.split('//')[1] : input
  link.ssl = /^https/.test(input)

  // console.log('link', link)
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