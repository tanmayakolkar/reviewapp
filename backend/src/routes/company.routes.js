const express = require("express");
const router = express.Router();
const reviewRouter = require("./review.routes");
const companyController = require("../controllers/company.controller");
const ensureAuthenticated = require("../utils/auth.util").ensureAuthenticated;
const ensureHasRole = require("../utils/auth.util").ensureHasRole;

router.get('/', ensureAuthenticated, companyController.listCompanies);
router.post('/', ensureAuthenticated, ensureHasRole("ADMIN"), companyController.createCompany);
router.put('/:id', ensureAuthenticated, ensureHasRole("ADMIN"), companyController.updateCompany);
router.delete('/:id', ensureAuthenticated, ensureHasRole("ADMIN"), companyController.removeCompany);
router.get('/:id', ensureAuthenticated, companyController.getCompanyDetail);

router.use('/:companyId/review', reviewRouter);

module.exports = router;
