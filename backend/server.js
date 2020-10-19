const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const data = require('./data')
const config = require('./config')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoute')
const port = 5000 || process.env.PORT

dotenv.config()
const mongodburl = config.MONGODB_URL

mongoose.connect(mongodburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    
}).then(() => console.log('Conneted to database')
).catch((e) => console.log(e.reason))

const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/api/users/', userRouter)
app.use('/api/products', productRouter)

// app.get('/api/products', (req, res) => {
//     res.send(data.products)
// })

app.get('/api/products/:id', (req, res) => {
    const id = req.params.id
    const product = data.products.find(x => x._id === id )
    if(product) return res.send(product);
    return res.send('Not found')
})

app.listen(port, () => {
    console.log(`Server working on port ${port}`)
})