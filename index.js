const { MongoClient, ServerApiVersion } = require('mongodb');
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
        
        app.get('/products', async(req, res)=>{
            const query = {}
            const cursor = productCollection.find(query)
            const product = await cursor.toArray()
            res.send(product)
        })


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