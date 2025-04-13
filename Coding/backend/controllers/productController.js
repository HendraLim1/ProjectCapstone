import asyncHandler from '../middlewares/asyncHandler.js';
import Product from '../models/productModel.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addProduct = async (req, res) => {
  try {
    const { name, description, brand, price, quantity, category, countInStock } =
      req.fields || req.body;

    // Validate required fields
    if (!name || !description || !brand || !price || !quantity || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Set default image path
    let image = '/uploads/default.jpg';

    // If an image was uploaded
    if (req.files && req.files.image) {
      const file = req.files.image;
      const filename = `upload_${Date.now()}_${file.originalFilename || file.name}`;
      const targetPath = path.join(__dirname, '../../uploads', filename);

      try {
        // Move the file to the uploads directory
        if (fs.existsSync(file.path)) {
          fs.renameSync(file.path, targetPath);
          image = `/uploads/${filename}`;
          console.log('Image saved successfully at:', targetPath);
        } else {
          console.error('Source file does not exist:', file.path);
          return res.status(500).json({ error: 'Image upload failed - source file not found' });
        }
      } catch (fileError) {
        console.error('Error handling file:', fileError);
        // Clean up temporary file if it exists
        if (fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path);
          } catch (cleanupError) {
            console.error('Error cleaning up temporary file:', cleanupError);
          }
        }
        return res.status(500).json({ error: 'Failed to process image upload' });
      }
    }

    const productData = {
      name,
      description,
      brand,
      price: Number(price),
      quantity: Number(quantity),
      category,
      countInStock: Number(countInStock || 0),
      image,
      user: req.user._id,
    };

    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (error) {
    console.error('Error in addProduct controller:', error);
    res.status(400).json({ message: error.message });
  }
};

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    console.log('Update request received:', {
      fields: req.fields,
      files: req.files,
      params: req.params,
    });

    const { name, description, brand, price, quantity, category, countInStock } =
      req.fields || req.body;

    // Validation
    switch (true) {
      case !name:
        return res.status(400).json({ error: 'Name is required' });
      case !description:
        return res.status(400).json({ error: 'Description is required' });
      case !brand:
        return res.status(400).json({ error: 'Brand is required' });
      case !price:
        return res.status(400).json({ error: 'Price is required' });
      case !quantity:
        return res.status(400).json({ error: 'Quantity is required' });
      case !category:
        return res.status(400).json({ error: 'Category is required' });
    }

    // Find the product first
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Prepare update data
    const updateData = {
      name,
      description,
      brand,
      price: Number(price),
      quantity: Number(quantity),
      category,
      countInStock: Number(countInStock || 0),
    };

    // Handle image upload
    if (req.files && req.files.image) {
      const file = req.files.image;
      console.log('Image file received:', file);

      // Get the filename and ensure it's unique
      const filename = `${Date.now()}-${file.originalFilename || file.name}`;
      const targetPath = path.join(__dirname, '../../uploads', filename);

      try {
        // Log the current path and target path
        console.log('Current file path:', file.path);
        console.log('Target path:', targetPath);

        // Move the file to the uploads directory
        if (fs.existsSync(file.path)) {
          // Delete old image if it exists and is not the default image
          if (product.image && product.image !== '/uploads/default.jpg') {
            const oldImagePath = path.join(__dirname, '../..', product.image);
            if (fs.existsSync(oldImagePath)) {
              fs.unlinkSync(oldImagePath);
            }
          }

          // Move the new image
          fs.renameSync(file.path, targetPath);
          updateData.image = `/uploads/${filename}`;
          console.log('Image saved successfully at:', targetPath);
        } else {
          console.error('Source file does not exist:', file.path);
          return res.status(500).json({ error: 'Image upload failed - source file not found' });
        }
      } catch (fileError) {
        console.error('Error handling file:', fileError);
        // Clean up temporary file if it exists
        if (fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path);
          } catch (cleanupError) {
            console.error('Error cleaning up temporary file:', cleanupError);
          }
        }
        return res.status(500).json({ error: 'Failed to process image upload' });
      }
    }

    // Update the product fields
    Object.assign(product, updateData);
    const updatedProduct = await product.save();
    console.log('Product updated successfully:', updatedProduct);

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ error: error.message });
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  try {
    console.log('Attempting to delete product with ID:', req.params.id);

    const product = await Product.findById(req.params.id);

    if (!product) {
      console.error('Product not found for deletion');
      return res.status(404).json({ error: 'Product not found' });
    }

    await Product.findByIdAndDelete(req.params.id);
    console.log('Product deleted successfully');
    res.json({ message: 'Product removed successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: error.message });
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Product not found' });
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).populate('category').limit(12).sort({ createAt: -1 });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        return res.status(400).json({ error: 'Product already reviewed' });
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review added successfully' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 }).limit(5);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export {
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
};
