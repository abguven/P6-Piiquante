const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const auth = require('../middlewares/auth');
const lang = require('../language/fr');

router.post("/signup", userController.signup);
router.post("/login", userController.login);


module.exports = router;