const newsModel = require('../model/newsModel')

const getNews = async function (req, res) {
    try {
        let findBycategory = req.query

        if (!Object.keys(findBycategory).length)
            return res.status(400).send({ status: false, msg: "please enter valid category" });

        if (!findBycategory.category)
            return res.status(400).send({ status: false, msg: "please provide the relevent category" });

        let categoryArr = findBycategory.category.split(',')

        let findNeswByCategory = await newsModel.find({ category: { $all: categoryArr } })

        if (!findNeswByCategory.length) {
            return res.status(404).send({ status: false, msg: `No Such News Exits With This ${categoryArr}` });
        } else {
            return res.status(200).send({ status: true, News: findNeswByCategory });
        }

    } catch (err) {
        res.status(500).send({ status: false, error: err.message });
    }
}
module.exports = getNews