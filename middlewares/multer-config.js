const multer = require('multer');
const uuid4 = require("uuid").v4;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"images")
    },
    filename: (req, file, cb) => {
        const name = file.originalname.split(" ").join("_");
        const newFileName = uuid4().replace(/-/g, "") + name;
        cb(null, newFileName);
    }
});

module.exports = multer({ storage }).single("image");

// TODO : Prevent files other than an image file