const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

require('dotenv').config(); // Load environment variables from .env file
//const api = process.env.API_URL || 'http://localhost:3000';

const api = '/api/v1/';
if (process.env.NODE_ENV === 'development') {
    console.log('API URL:', api); // Print the API URL in debug mode
}

app.use(cors({
    credentials: true,
    origin: ['https://fashion-frontend-liard.vercel.app/'],
    methods:['GET','POST'],
}));


app.get('/',(req,res) => {
    res.send('Hello World')
})

//middleware
app.use(express.json());
app.use(authJwt());
app.use('/public/uploads/', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);


//Routes
const productsRouter = require('./routes/products') // for router
const users = require('./routes/users');
const orders = require('./routes/orders');
const cart_Items = require('./routes/cart-Items');
const contactRouter = require('./routes/contacts');

//routers
app.use(`${api}/products`,productsRouter);
app.use(`${api}/users`,users);
app.use(`${api}/orders`,orders);
app.use(`${api}/cart`,cart_Items);
app.use(`${api}/contacts`,contactRouter);


app.use('/images', express.static('uploads'));


// MongoDB Atlas connection string
const atlasUri = 'mongodb+srv://root:root@fashion.2ugsoet.mongodb.net/?retryWrites=true&w=majority&appName=fashion';

mongoose.connect(atlasUri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Database connection is ready');
}).catch((err) => {
    console.log(err);
});

//server

app.listen(3000,()=>{
    console.log(`server is running at ${api}`)
})
