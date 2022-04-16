const multer = require('multer');
const uuid4 = require("uuid").v4;

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png"
};


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"images")
    },
    filename: (req, file, cb) => {
        const name = file.originalname.split(" ").join("_");
        const extention = MIME_TYPES[file.mimetype];
        const newFileName = name + uuid4().replace(/-/g, "") + "." +extention;
        cb(null, newFileName);
    }
});

module.exports = multer({ storage }).single("image");