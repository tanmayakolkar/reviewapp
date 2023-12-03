const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const ensureAuthenticated = require("../utils/auth.util").ensureAuthenticated;

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', ensureAuthenticated, authController.getProfileDetails);

module.exports = router;
