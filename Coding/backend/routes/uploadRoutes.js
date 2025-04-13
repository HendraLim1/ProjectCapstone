import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../../uploads');
    console.log('Upload destination path:', uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate a unique filename with timestamp and original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`;
    console.log('Generated filename:', filename);
    cb(null, filename);
  },
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp|WEBP)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
});

// Route to handle file uploads
router.post('/', upload.single('image'), (req, res) => {
  console.log('Upload request received');
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  console.log('Request file:', req.file);

  if (req.fileValidationError) {
    return res.status(400).json({ error: req.fileValidationError });
  }

  if (!req.file) {
    console.log('No file in request');
    return res.status(400).json({ error: 'No file uploaded' });
  }

  console.log('File uploaded successfully:', {
    filename: req.file.filename,
    path: req.file.path,
    size: req.file.size,
    mimetype: req.file.mimetype,
  });

  // Return the file path
  const imageUrl = `/uploads/${req.file.filename}`;
  console.log('Returning image URL:', imageUrl);
  res.json({ image: imageUrl });
});

export default router;
