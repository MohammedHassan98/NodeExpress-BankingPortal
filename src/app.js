const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '../public'))
app.set('views', 'views');

app.get('/', (req, res, next) => {
  res.render(path.join(__dirname, 'views', 'index.ejs'), { title: 'Index' })
})

app.listen(3000, () => {
  console.log('Connected')
})
