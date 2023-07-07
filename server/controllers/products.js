const cloudinary = require('cloudinary').v2;
const Product = require('../models/index');
const Subcategory = require('../models/SubCategory');
const fs = require('fs');

// // Configuration 
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_API_NAME,
//   api_key:process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET_KEY
// });

exports.getProducts = (req, res, next) => {
  Product.find()
    .populate('subcategory')
    .populate('category')
    .then(products => {
      res.status(200).json({
        products: products
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getSingleProduct = (req, res, next) => {

  const prodId=req.params.prodId

  Product.findById(prodId)
    .then(product => {
      if(!product){
        const err = new Error('could not find product')
        err.statusCode =404
        throw err
      }
      res.status(200).json({
        product
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


exports.getFilteredProducts = (req, res, next) => {
  const { catId } = req.params; // Extract category ID from URL params

  // const { maxPrice, sort, subCats } = req.body; // Extract filter options from request body


  // // Build your query based on the filter options
  // const query = {
  //   category: catId,
  //   price: { $lte: +maxPrice }, // Apply max price filter
  // };

  // let sortOption = {};

  // if (sort === "asc") {
  //   // Apply sorting in ascending order
  //   sortOption.price = 1;
  // } else if (sort === "desc") {
  //   // Apply sorting in descending order
  //   sortOption.price = -1;
  // }

  // if (subCats.length > 0) {
  //   // Apply subcategory filter
  //   query.subcategory = { $in: subCats };
  // }

  

  // Perform the database query using the constructed query
  Product.find({category:catId})
    .populate("category")
    .populate("subcategory")
    
    .then((products) => {
      console.log(products);
      res.status(200).json({ products });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.addProduct = async (req, res, next) => {
  const { name, description, price, category, subcategory } = req.body;
  const image = req.file;
console.log(image);
return
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(image, {
      folder: 'images'
    });

    // Create a new product object with the image URL
    const product = new Product({
      name,
      description,
      price,
      category,
      subcategory,
      image: result.secure_url, // Image URL from Cloudinary
    });

    // Save the product to the database
    const savedProduct = await product.save();

    // Find the subcategory and update its products array
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      subcategory,
      { $push: { products: savedProduct._id } },
      { new: true }
    );

    res.status(201).json({ success: true, message: 'Product added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to add product' });
  }
};

exports.updateProduct = async (req, res, next) => {
  const { productId } = req.params;
  const { name, description, price, category, subcategory } = req.body;
  const image = req.file?.path;

  try {
    let product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (image) {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(image, {
        folder: 'images'
      });

      product.image = result.secure_url; // Update image URL
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.subcategory = subcategory;

    await product.save();

    // Remove the temporary image file
    if (image) {
      fs.unlinkSync(image);
    }

    res.status(200).json({ success: true, message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to update product' });
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { productId } = req.params;

  try {
    let product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Delete the product image from Cloudinary
    await cloudinary.uploader.destroy(product.image_id);

    // Delete the product from the database
    await product.remove();

    res.status(200).json({ success: true, message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to update product' });
  }
}