const express = require('express')
const routerProduct = require('./routes/product-router')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const corsOptions = {
    origin: 'http://localhost:4200',
    optionSuccessStatus: 200
}

app.use(bodyParser.json())

app.use(cors(corsOptions))

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended:false }))

app.use('/products', routerProduct)

const server = app.listen(8080, function () {
  const host = server.address().address
  const port = server.address().port

  console.log(`server jalan di ${host} ${port}`)
})