const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());


// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASSWORD);


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1ndgjy2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })


async function run() {
    try {

        const productCollection = client.db('repliq').collection('products')
        const orderCollection = client.db('repliq').collection('orders')
        const customersCollection = client.db('repliq').collection('customers')

        app.get('/products', async (req, res) => {
            const query = {}
            const cursor = productCollection.find(query)
            const product = await cursor.toArray()
            res.send(product)
        });

        app.post('/products', async (req, res) => {
            const users = req.body
            const result = await productCollection.insertOne(users)
            res.send(result)
        });

        app.get('/products/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const product = await productCollection.findOne(query)
            res.send(product)
        });

        app.get('/checkout/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const product = await productCollection.findOne(query)
            res.send(product)
        });

        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result);
        });

        app.get('/orders', async (req, res) => {
            const query = {}
            const cursor = orderCollection.find(query)
            const orders = await cursor.toArray()
            res.send(orders)
        });

        app.post('/customers', async (req, res) => {
            const users = req.body
            const result = await customersCollection.insertOne(users)
            res.send(result)
        });
        

        app.get('/customers', async (req, res) => {
            const query = {}
            const cursor = customersCollection.find(query)
            const orders = await cursor.toArray()
            res.send(orders)
        });


        app.get('/customer', async (req, res) => {
            const query = { role: "customer" }
            const user = await customersCollection.find(query).toArray()
            res.send(user)
        });


        app.get('/customer', async (req, res) => {
            const query = { role: "admin" }
            const user = await customersCollection.find(query).toArray()
            res.send(user)
        });


    }
    finally {

    }
}
run().catch(error => console.error(error))



app.get('/', (req, res) => {
    res.send('repliq server is running')
})

app.listen(port, () => {
    console.log(`repliq server is running on ${port}`);
})