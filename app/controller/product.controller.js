const productService = require("../services/product.service")

const createProduct = async (ProductData, done)=>{
    productService.createProduct(ProductData, done)
}

const getDetails = async (userId, done)=>{
    productService.getDetails(userId, done)
}

module.exports={
    createProduct,getDetails
}