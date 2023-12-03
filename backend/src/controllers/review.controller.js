const Review = require("../../db/models").Review;

const listAllReviews = async (req, res) => {
    try {
        let reviews = await Review.findAll({
            where: {
                companyId: req.params.companyId
            }
        });
        return res.status(200).send({
            status: 200,
            success: true,
            data: reviews
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

const createReview = async (req, res) => {
    try {
        const review = await Review.create({
            userId: req.body.userId,
            companyId: req.body.companyId,
            description: req.body.description,
            rating: req.body.rating
        });
        let reviewObj = review.toJSON();
        return res.status(201).send({
            status: 201,
            success: true,
            data: reviewObj
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

const updateReview = async (req, res) => {
    try {
        let review = await Review.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        let reviewObj = review.toJSON();
        return res.status(200).send({
            status: 200,
            success: true,
            data: reviewObj
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

const deleteReview = async (req, res) => {
    try {
        await Review.destroy({
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

module.exports = {
    listAllReviews,
    createReview,
    updateReview,
    deleteReview
};
