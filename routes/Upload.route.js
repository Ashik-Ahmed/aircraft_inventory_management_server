const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Set the upload directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Upload endpoint
router.post('/', upload.single('image'), (req, res) => {
    try {
        res.status(201).json({
            status: 'Success',
            filePath: `/uploads/${req.file.filename}`
        });
    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            error: 'Internal Server Error'
        });
    }
});

module.exports = router;
