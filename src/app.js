const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express()

const accountRoutes = require('./routes/accounts.js')
const servicesRoutes = require('./routes/services.js')


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname + '/public')))
app.use(express.urlencoded({ extended: true }));
app.use('/account', accountRoutes)
app.use('/services', servicesRoutes)

const { accounts, users, writeJSON } = require('./data.js')

// const accountData  = fs.readFileSync('src/json/accounts.json', {encoding:'utf8'})
// const accounts = JSON.parse(accountData)
//
// const userData  = fs.readFileSync('src/json/users.json', {encoding:'utf8'})
// const users = JSON.parse(userData)

app.get('/', (req, res, next) => {
  res.render('index', { title: 'Account Summary', accounts: accounts })
})

app.get('/profile', (req, res) => {
  res.render('profile', {user: users[0]})
})

app.listen(3000, () => {
  console.log('Connected')
})
