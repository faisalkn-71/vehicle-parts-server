const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.osz6xx4.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
  try {
    await client.connect();

    const productCollection = client.db('vehicleParts').collection('products');
    const reviewCollection = client.db('vehicleParts').collection('reviews');
    const orderCollection = client.db('vehicleParts').collection('order');


    app.get('/products', async(req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      res.send(products)
    })


    app.get('/products/:id', async(req, res) =>  {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const product = await productCollection.findOne(query);
      res.send(product)
    })



    app.get('/order', async (req, res) => {
      
          const query = {};
          const cursor = orderCollection.find(query);
          const orders = await cursor.toArray();
          res.send(orders);
      
  })


    app.post('/order', async (req, res) => {
      const order = req.body;
      const result = await orderCollection.insertOne(order);
      res.send(result);
      
  })


  app.delete('/order/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await orderCollection.deleteOne(query);
    res.send(result);
});

    


    app.get('/reviews', async (req, res) => {
      const query = {};
      const cursor = reviewCollection.find(query);
      const reviews = await cursor.toArray();
      res.send(reviews);
    })

  }
  finally {

  }

}

run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Motor Parts is Running!')
})

app.listen(port, () => {
  console.log(`Motor Parts listening on port ${port}`)
})