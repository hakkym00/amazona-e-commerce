const express = require('express')
const ProductModel = require('../Models/productModel')
const { isAuth, isAdmin } = require('../utils')
const router = express.Router()

router.get('/', async (req, res) => {
    const products = await ProductModel.find()
    if(!products){
        return res.status(404).send({msg: ''})
    }
    res.send(products)
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
    console.log(req.body)
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
        return res.status(500).send({message: 'Error in creating product'})


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










