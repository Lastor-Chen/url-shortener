// App Server

// import package
// ==============================

// npm package
const express = require('express')
const exphbs = require('express-handlebars')
const randomstring = require("randomstring")


// 環境 setting
// ==============================

const app = express()
app.set('port', process.env.PORT || 3000)

app.use(express.urlencoded({ extended: true }))

// 設定模板引擎
const hbs = exphbs.create({
  extname: 'hbs', 
  defaultLayout: false
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')


// route 設定
// ==============================

const link = {
  short: "",
  url: "",
  ssl: null
}

app.get('/', (req, res) => res.render('index'))

app.get('/shorten', (req, res) => res.redirect('/'))

app.post('/shorten', (req, res) => {
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

  console.log('link', link)
  res.render('index', { short })
})

app.get('/:short', (req, res) => {
  const short = req.params.url

  // Query
  // Link.findOne({ short }, link => {...})
  const protocol = link.ssl ? 'https://' : 'http://'
  const url = link.url

  console.log('target', protocol + url)
  res.redirect(protocol + url)
})


// start server
// ==============================

app.listen(app.get('port'), () => {
  const mode = process.env.NODE_ENV || 'development'

  console.log(`Using environment "${mode}".`)
  console.log(`App is running on "localhost:${app.get('port')}"`)
})