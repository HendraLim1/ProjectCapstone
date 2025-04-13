import express from 'express';
import formidable from 'express-formidable';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Controllers
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
} from '../controllers/productController.js';

// Middleware
import { protect, admin } from '../middlewares/authMiddleware.js';
import checkId from '../middlewares/checkId.js';

// Configure formidable
const formidableOptions = {
  encoding: 'utf-8',
  uploadDir: path.join(__dirname, '../../uploads'),
  keepExtensions: true,
  maxFileSize: 5 * 1024 * 1024, // 5MB
  multiples: false,
  filter: function ({ name, originalFilename, mimetype }) {
    // Accept images only
    return mimetype && mimetype.includes('image/');
  },
};

// Routes
router
  .route('/')
  .get(fetchProducts)
  .post(protect, admin, formidable(formidableOptions), addProduct);

router.route('/allproducts').get(fetchAllProducts);
router.route('/:id/reviews').post(protect, checkId, addProductReview);

router.get('/top', fetchTopProducts);
router.get('/new', fetchNewProducts);

router
  .route('/:id')
  .get(fetchProductById)
  .put(protect, admin, formidable(formidableOptions), updateProductDetails)
  .delete(protect, admin, removeProduct);

export default router;
