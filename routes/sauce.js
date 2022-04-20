// routes/sauce.js

const express = require('express');
const router = express.Router();
const sauceController = require('../controllers/sauce');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

// TODO AUTHORIZATION !!!!!!!!!!! 

router.get("/", auth, sauceController.getAll);
router.get("/:id", auth, sauceController.getOne);

router.post("/", multer, auth, sauceController.newSauce);
router.put("/:id", multer, auth, sauceController.modifiySauce);
router.delete("/:id",  auth, sauceController.deleteSauce);
router.post("/:id/like", auth, sauceController.likeSauce);

module.exports = router;