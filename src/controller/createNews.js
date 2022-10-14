const newsModel = require('../model/newsModel')

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

const createNews = async function (req, res) {
    try {
        let dataComesFromUser = req.body
        if (!Object.keys(dataComesFromUser).length)
            return res.status(400).send({ status: false, msg: "please enter valid inputs" });

        if (!isValid(dataComesFromUser.heading))
            return res.status(400).send({ status: false, msg: "please provide the news heading" });

        if (!isValid(dataComesFromUser.category))
            return res.status(400).send({ status: false, msg: "please provide the relevent category" });

        if (!isValid(dataComesFromUser.description))
            return res.status(400).send({ status: false, msg: "please provide the news description" });

        let categoryArr = dataComesFromUser.category.split(',')
        dataComesFromUser.category = categoryArr

        let newsCreate = await newsModel.create(dataComesFromUser)

        res.status(201).send({ status: true, msg: "News Created Sucessfully", data: newsCreate })

    } catch (err) {

        res.status(500).send({ status: false, error: err.message });
    }
}
module.exports = createNews