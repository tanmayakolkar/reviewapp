const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");
const ensureAuthenticated = require("../utils/auth.util").ensureAuthenticated;
const ensureHasRole = require("../utils/auth.util").ensureHasRole;

// List all reviews for a company
router.get("/", ensureAuthenticated, reviewController.listAllReviews);
// Create review for a company
router.post("/", ensureAuthenticated, ensureHasRole("CLIENT"), reviewController.createReview);
router.put("/:id", ensureAuthenticated, ensureHasRole("CLIENT"), reviewController.updateReview);
router.delete("/:id", ensureAuthenticated, ensureHasRole("CLIENT"), reviewController.deleteReview);

module.exports = router;
