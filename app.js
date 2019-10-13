// App Server

// import package
// ==============================

// npm package
const express = require('express')
const exphbs = require('express-handlebars')


// setting
// ==============================

const app = express()
app.set('port', process.env.PORT || 3000)
app.set('hostname', process.env.HOSTNAME || 'localhost')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// 設定模板引擎
const hbs = exphbs.create({
  extname: 'hbs', 
  defaultLayout: false
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

// connect to mongoDB
require('./models/index.js')()

// 模板公用變數
app.use((res, req, next) => {
  req.locals.host = app.get('hostname')
  next()
})

// route
// ==============================

app.use('/', require('./routes/home.js'))


// start server
// ==============================

app.listen(app.get('port'), () => {
  const mode = process.env.NODE_ENV || 'development'
  console.log(`\n[App] Using environment "${mode}".`)
  console.log(`[App] App is running on "${app.get('hostname')}:${app.get('port')}"`)
})