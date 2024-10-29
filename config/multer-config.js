const multer = require('multer');

// Storage configuration
const storage = multer.memoryStorage();

// Set the file size limit (for example, 2MB)
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 },  // Limit file size to 2MB (you can adjust this as needed)
    fileFilter: function (req, file, cb) {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

module.exports = upload;
