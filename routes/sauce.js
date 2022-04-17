// routes/sauce.js

const express = require('express');
const router = express.Router();
const sauceController = require('../controllers/sauce');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

// TODO AUTHORIZATION !!!!!!!!!!! 

router.get("/", auth, sauceController.getAll);
router.get("/:id", auth, sauceController.getOne);

router.post("/", multer, sauceController.newSauce);
router.put("/:id", multer, sauceController.modifiySauce);
router.delete("/:id", sauceController.deleteSauce);
router.post("/:id/like",sauceController.likeSauce);

module.exports = router;