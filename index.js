const express = require('express');
const cors = require('cors');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000

//Z78iYttG4O69yVoO
//product_catalog_user

// Middleware
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xweyicz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const productCatalogDB = client.db('ProductCatalogDB')
    const productsCollection = productCatalogDB.collection('products')

    app.get('/productsCount',async(req,res)=>{
      const count = await productsCollection.estimatedDocumentCount()
      res.send({count})
    })

    app.get('/products', async (req,res)=>{
      const page = parseInt(req.query.page)
      const size = parseInt(req.query.size)
      const sortOption = req.query.sort;
      const skip = (page - 1)*size

      let sort = {}
      switch (sortOption){
        case 'low-high':
          sort = {price:1}
          break;
        case 'high-low':
          sort = {price:-1}
          break;
        case 'newest':
          sort = {date_added:1}
          break;
        case 'auto':
          sort = {}
          break;
        default:
          sort = {}
      }

      const result = await productsCollection.find()
      .skip(skip)
      .limit(size)
      .sort(sort)
      .toArray()

      res.send(result)
    })
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send("PRODUCT CATALOG SERVER IN RUNNING")
})

app.listen(port, () => {
  console.log("PRODUCT CATALOG SERVER RUNNING ON", port);
})