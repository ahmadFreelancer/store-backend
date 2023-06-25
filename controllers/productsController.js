const productsModel = require("../models/productsModel")


const getAllProducts = async (req, res) => {
    const { featured, name, company, sort, fields, numericFilters, category, all, id } = req.query;
    const queryObject = {};
    if (featured) {
        queryObject.featured = featured === "true" ? true : false
    }
    if (name) {
        queryObject.name = { $regex: name, $options: "i" }
    }
    if (company) {
        queryObject.company = company
    }
    if (category) {
        queryObject.category = category
    }


    // console.log(JSON.parse(JSON.stringify(req.query)))
    // queryObject.price = { $gt: price };
    // result = productsModel.find({ price: { $lt: 111 } })

    let result = productsModel.find(queryObject);


    // sort based on query parameters, like "?sort=company" or "sort=-price"
    if (sort) {
        const sortList = sort.split(",").join(" ")
        // console.log(sortList)
        result = result.sort(sortList)
    }
    else {
        result = result.sort("createdAt")
    }

    // select only a single field or multiple fields, like "?fields=name" or "fields=url"

    if (fields) {
        const fieldList = fields.split(",").join(" ")
        result = result.select(fieldList)
    }

    // if (numericFilters) {
    //     const operatorMap = {
    //         '>': '$gt',
    //         '<': '$lt',
    //         '>=': '$gte',
    //         '<=': '$lte',
    //         '=': '$eq'
    //     }
    //     const regEx = /\b(<|<=|>|>=|<|=)\b/g;
    //     let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
    //     const options = ['price', 'rating'];
    //     filters = filters.split(",").forEach((item) => {
    //         const [field, operator, value] = item.split("-")
    //         if (options.includes(field)) {
    //             queryObject[field] = { [operator]: Number(value) }
    //         }
    //     })

    // }

    
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // perform limit and skip on every request...
    result = result.skip(skip).limit(limit);


    const products = await result
    res.status(200).json({ products, nbHits: products.length })

}



// Just For Testing Purposes

const getAllProductsStatic = async (req, res) => {
    const products = await productsModel.find().sort({ price: 'desc' })
    res.status(200).json(products)
}



const getSingleProduct = async (req, res) => {
    const products = await productsModel.find({'_id': req.query.id})
    res.status(200).json(products)
}



module.exports = { getAllProducts, getAllProductsStatic, getSingleProduct }