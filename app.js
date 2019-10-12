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

app.use(express.urlencoded({ extended: true }))

// 設定模板引擎
const hbs = exphbs.create({
  extname: 'hbs', 
  defaultLayout: false
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

// connect to mongoDB
require('./models/index.js')()


// route
// ==============================

app.use('/', require('./routes/home.js'))


// start server
// ==============================

app.listen(app.get('port'), () => {
  const mode = process.env.NODE_ENV || 'development'
  console.log(`\n[App] Using environment "${mode}".`)
  console.log(`[App] App is running on "localhost:${app.get('port')}"`)
})