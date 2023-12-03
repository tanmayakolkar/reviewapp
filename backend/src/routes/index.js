const express = require("express");
const router = express.Router();
const authRouter = require("./auth.routes");
const companyRouter = require("./company.routes");

router.use('/auth', authRouter);
router.use('/company', companyRouter);

module.exports = router;
