const Company = require("../../db/models").Company;

const listCompanies = async (req, res) => {
    try {
        let companies = await Company.findAll();
        return res.status(200).send({
            status: 200,
            success: true,
            data: companies
        });
    } catch (err) {
        return res.status(500).send({
            status: 500,
            success: false,
            message: "Error occured",
            error: err
        });
    }
};

const createCompany = async (req, res) => {
    try {
        const company = await Company.create({
            name: req.body.name,
            founded: req.body.founded,
            address: req.body.address
        });
        let companyObj = company.toJSON();
        return res.status(201).send({
            status: 201,
            success: true,
            data: companyObj
        });
    } catch (err) {
        return res.status(500).send({
            status: 500,
            success: false,
            message: "Error occured",
            error: err
        });
    }
};

const updateCompany = async (req, res) => {
    try {
        let company = await Company.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        let companyObj = company.toJSON();
        return res.status(200).send({
            status: 200,
            success: true,
            data: companyObj
        });
    } catch (err) {
        return res.status(500).send({
            status: 500,
            success: false,
            message: "Error occured",
            error: err
        });
    }
};

const removeCompany = async (req, res) => {
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });

        return res.status(200).send({
            status: 200,
            success: true,
            data: null
        });
    } catch (err) {
        return res.status(500).send({
            status: 500,
            success: false,
            message: "Error occured",
            error: err
        });
    }
};

const getCompanyDetail = async (req, res) => {
    try {
        let company = await Company.findByPk(req.params.id);
        if (!company) {
            return res.status(400).send({
                status: 400,
                success: false,
                message: 'Company not found',
                error: null
            });
        }
        return res.status(200).send({
            status: 200,
            success: true,
            data: company
        });
    } catch (err) {
        return res.status(500).send({
            status: 500,
            success: false,
            message: "Error occured",
            error: err
        });
    }
};

module.exports = {
    listCompanies,
    createCompany,
    updateCompany,
    removeCompany,
    getCompanyDetail
};
