const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname + '/public')))
app.use(express.urlencoded({extended:true}));

const accountData  = fs.readFileSync('src/json/accounts.json', {encoding:'utf8'})
const accounts = JSON.parse(accountData)

const userData  = fs.readFileSync('src/json/users.json', {encoding:'utf8'})
const users = JSON.parse(userData)

app.get('/', (req, res, next) => {
  res.render('index', { title: 'Account Summary', accounts: accounts })
})

app.get('/savings', (req, res) => {
  res.render('account', {account: accounts.savings})
})

app.get('/checking', (req, res) => {
  res.render('account', {account: accounts.checking})
})

app.get('/credit', (req, res) => {
  res.render('account', {account: accounts.credit})
})

app.get('/profile', (req, res) => {
  res.render('profile', {user: users[0]})
})

app.get('/transfer', (req, res) => {
  res.render('transfer')
})

app.get('/payment', (req, res) => {
  res.render('payment', {account: accounts.credit})
})

app.post('/payment', (req, res) => {
  const newBalance = req.body.amount
  accounts.credit.balance = accounts.credit.balance - parseInt(newBalance)
  accounts.credit.available = accounts.credit.available + parseInt(newBalance)
  var accountsJSON = JSON.stringify(accounts)
  fs.writeFileSync(path.join(__dirname + '/json/accounts.json') , accountsJSON, {encoding:'utf8'})
  res.render('payment', {  message: "Payment Successful", account: accounts.credit })
})

app.post('/transfer', (req, res) => {
  accounts["savings"].balance = parseInt(150)
  var accountsJSON = JSON.stringify(accounts)
  fs.writeFileSync(path.join(__dirname + '/json/accounts.json') ,accountsJSON, {encoding:'utf8'})

  res.render('transfer', {message: "Transfer Completed"})
})

app.listen(3000, () => {
  console.log('Connected')
})
