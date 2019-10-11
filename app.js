// App Server

// import package
// ==============================

// npm package
const express = require('express')
const exphbs = require('express-handlebars')

// 環境 setting
// ==============================

const app = express()
app.set('port', process.env.PORT || 3000)

app.use(express.urlencoded({ extended: true }))

// 設定模板引擎
const hbs = exphbs.create({
  extname: 'hbs', 
  defaultLayout: 'main'
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

// route 設定
// ==============================

app.use('/', (req, res) => res.send('Server is running'))

// start server
// ==============================

app.listen(app.get('port'), () => {
  const mode = process.env.NODE_ENV || 'development'
  console.log(`Using environment "${mode}".`)
  console.log(
    'Node.js Server with Express is running.',
    '\033[33m',
    `=> http://localhost:${app.get('port')}`,
    '\033[0m'
  )
})