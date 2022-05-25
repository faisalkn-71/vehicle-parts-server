const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());




app.get('/', (req, res) => {
  res.send('Motor Parts is Running!')
})

app.listen(port, () => {
  console.log(`Motor Parts listening on port ${port}`)
})