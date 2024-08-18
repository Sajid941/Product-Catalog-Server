const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Enable parsing of JSON data in request bodies

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xweyicz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with options for the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the MongoDB server (optional starting in v4.7)
    // await client.connect();

    // Reference to the database and collection
    const productCatalogDB = client.db('ProductCatalogDB');
    const productsCollection = productCatalogDB.collection('products');

    // API route to get the total count of products
    app.get('/productsCount', async (req, res) => {
      const count = await productsCollection.estimatedDocumentCount(); // Get an estimate of the number of documents in the collection
      res.send({ count }); // Send the count as a JSON response
    });

    // API route to get a paginated list of products with filters and sorting
    app.get('/products', async (req, res) => {
      const page = parseInt(req.query.page); // Get the page number from query params
      const size = parseInt(req.query.size); // Get the number of items per page from query params
      const sortOption = req.query.sort; // Get the sorting option from query params
      const searchQuery = req.query.query; // Get the search query from query params
      const brandName = req.query.brandName; // Get the brand name filter from query params
      const category = req.query.category; // Get the category filter from query params
      const minPrice = parseInt(req.query.minimumPrice) || 0; // Get the minimum price filter from query params, default to 0
      const maxPrice = parseInt(req.query.maximumPrice) || Number.MAX_SAFE_INTEGER; // Get the maximum price filter from query params, default to max safe integer
      const skip = (page - 1) * size; // Calculate the number of documents to skip based on the current page

      console.log(minPrice, maxPrice);

      // Define sorting logic based on the selected option
      let sort = {};
      switch (sortOption) {
        case 'low-high':
          sort = { price: 1 }; // Sort by price in ascending order
          break;
        case 'high-low':
          sort = { price: -1 }; // Sort by price in descending order
          break;
        case 'newest':
          sort = { date_added: -1 }; // Sort by the date added in descending order
          break;
        case 'auto':
          sort = {}; // No sorting
          break;
        default:
          sort = {}; // Default to no sorting
      }

      // Define the query object for filtering products
      let query = {
        $and: [
          { name: { $regex: searchQuery ? searchQuery : "", $options: 'i' } }, // Search by product name using a case-insensitive regex
          brandName ? { company_name: { $regex: brandName, $options: 'i' } } : {}, // Filter by brand name if provided
          category ? { category: { $regex: category, $options: 'i' } } : {}, // Filter by category if provided
          { price: { $gte: minPrice, $lte: maxPrice } } // Filter by price range
        ]
      };

      // Fetch the filtered and sorted products from the database with pagination
      const result = await productsCollection.find(query)
        .skip(skip) // Skip documents for pagination
        .limit(size) // Limit the number of documents to return
        .sort(sort) // Apply sorting
        .toArray(); // Convert the result to an array

      res.send(result); // Send the result as a JSON response
    });

    // Send a ping to confirm a successful connection (optional)
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// Root route to verify the server is running
app.get('/', (req, res) => {
  res.send("PRODUCT CATALOG SERVER IS RUNNING");
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log("PRODUCT CATALOG SERVER RUNNING ON", port);
});
