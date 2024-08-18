# Gadget Galaxy Server

This project is a fully responsive e-commerce web application designed to provide a seamless shopping experience for users. It allows users to search, filter, and sort products across various categories, including brand, price range, and product type. The application features a dynamic product listing with advanced filtering options, enabling users to quickly find products that match their preferences.

## Website live link
### [https://product-catalog-9b837.web.app](https://product-catalog-9b837.web.app/)

## Server link
### [https://product-catalog-server.vercel.app](https://product-catalog-server.vercel.app)

## Client Side Repo
### [https://github.com/Sajid941/Product-Catalog-Client](https://github.com/Sajid941/Product-Catalog-Client)

## Featured

- **Dynamic Filtering**: Supports filtering by brand name, category, and price range.
- **Sorting Functionality**: Allows sorting products by price (low-high, high-low) and by date added (newest).
- **Text Search**: Implements case-insensitive search across product names.
- **Pagination Support**: Efficiently handles large datasets with pagination.
- **Product Count Retrieval**: Provides an endpoint to dynamically fetch the total number of products.
- **MongoDB Integration**: Utilizes MongoDB for data storage with efficient querying.

## Technologies

### Server Side :
- Node JS
- Express JS
- MongoDB

### Client Side : 
- React
- Tailwind css
- Firebase

## Installation

### Step 1:
```bash
# Clone the repo
git clone https://github.com/Sajid941/Product-Catalog-Server.git # Or download from github
```

### Step 2:
```bash
# Install dependencies
npm install
```
### Step 3: Setup environment keys
```bash
# .env.local Example
# MongoDB Database username & password:
DB_USER = MongoDB database username
DB_PASS = MongoDb database password
```

### Step 4:
```bash
#  Run the server
node index.js
```

## Contributing to the Backend

### Step 1:
```bash
# Fork the repository
# Go to the original repository on GitHub and click the "Fork" button in the upper right-hand corner.

```

### Step 2:
```bash
# Clone your fork
git clone https://github.com/your-username/Product-Catalog-Server.git
cd Product-Catalog-Server

```

### Step 3:
```bash
# Add the original repository as an upstream remote
git remote add upstream https://github.com/Sajid941/Product-Catalog-Server.git

```


### Step 4:
```bash
# Create a new branch for your feature or bug fix
git checkout -b feature-branch-name


```

### Step 5:
```bash
# Make your changes
```

### Step 6:
```bash
# Commit your changes
git commit -m "Description of changes"

```
### Step 7:
```bash
# Push to your branch
git push origin feature-branch-name


```