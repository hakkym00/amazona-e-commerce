const express = require('express')
const ProductModel = require('../Models/productModel')
const { isAuth, isAdmin } = require('../utils')
const router = express.Router()

router.get('/', async (req, res) => {
    console.log(req.query)
    console.log(`sortBy is ${req.query.sortBy}`)
    console.log(`category is ${req.query.category} , searchKeyword is ${req.query.searchKeyword}, `)
    const category = req.query.category ? { category: req.query.category } : {}
    const searchKeyword = req.query.searchKeyword ? { name: {
        $regex: req.query.searchKeyword,
        $options: 'i'
    }} : {}
    console.log(searchKeyword)
    const sortBy = req.query.sortBy === 'lowest' ? { price: 1 } : req.query.sortBy === 'highest' ? {price: -1} : {_id: -1}
    try {
        const products = await ProductModel.find({...category, ...searchKeyword}).sort(sortBy)
        if(!products){
            return res.status(404).send({message: 'No products found'})
        }
        console.log(products)
        res.send(products)
    } catch (error) {
        return res.status(500).send(error)
    }
})
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const products = await ProductModel.findOne({_id: id})
        if(products){
            res.send(products)
        }else{
            return res.status(404).send({message: 'Product not found'})
        }   
    } catch (error) {
        return res.status(500).send(error)
    }
    
})
router.post('/', isAuth, isAdmin, async (req, res) => {
    try {
        const product = new ProductModel({
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            brand: req.body.brand,
            description: req.body.description,
            price: req.body.price,
            availablequantity: req.body.availablequantity,
            ratings: req.body.ratings,
            numReviews: req.body.numReviews
        })

        const newProduct = await product.save();

        if(newProduct){
            return res.send({ message: 'Product created', data: newProduct })
        }
        return res.status(401).send({message: 'Error in creating product'})       
    } catch (error) {
        return res.status(500).send(error)
    }


})
router.put('/:id', isAuth, isAdmin, async (req, res) => {
    try {
    const id = req.params.id
    const product = await ProductModel.findOne({_id: id})
    if(product){
        product.name = req.body.name;
        product.image = req.body.image;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.description = req.body.description;
        product.price = req.body.price
        product.availablequantity = req.body.availablequantity;
        console.log(product)
        
        const updatedProduct = await product.save();
        if(updatedProduct){
            return res.send({ message: 'Product updated', data: updatedProduct })
        }
    }else{
        return res.status(500).send({message: 'Error in updating product'})
    }


        
    } catch (error) {
        return res.status(500).send(error.message)
    }
    

})
router.delete('/:id', isAuth, isAdmin, async(req, res) => {
    const _id = req.params.id
    const deletedProduct = await ProductModel.findById(_id)
    if(deletedProduct){
        deletedProduct.remove()
        return res.send({message: 'Product deleted'})
    }
    return res.status(400).send({message: 'Error in deletion'})
})


module.exports = router










