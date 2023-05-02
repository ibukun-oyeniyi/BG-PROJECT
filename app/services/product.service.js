const productDao = require("../dao/product.dao")

const createProduct = async (productData, done)=>{
    //call the todoListdao findtodoList method
    productDao.createProduct(productData, done)
}

const getDetails = async (userId, done)=>{
    //call the todoListdao findtodoList method
    operatorDao.getDetails(userId, done)
}

module.exports={
    createProduct,getDetails
}