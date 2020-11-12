const express = require('express')
const orderModel = require('../models/orderModel.js')

const { isAuth, isAdmin } = require('../utils.js')
const router = express.Router()

router.post('/',isAuth ,async(req, res) => {
    if(req.body.orderItems.length === 0){
        res.status(400).send({message: 'Cart is empty'})
    }else{
        const order = new orderModel({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shipping,
            paymentMethod: req.body.payment.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id
        })

        const newOrder = await order.save()
        
        res.status(201).send({message: 'New order Created', order: newOrder})

    }
})

router.get('/mine', isAuth, async(req, res) => {
    try {
        const order = await orderModel.find({user: req.user._id})
        if(order) {
            res.send(order)
            
        }else{
            res.status(404).send({message: 'Order not found'})
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/',isAuth, isAdmin, async(req, res) => {
    console.log('loading')
    try {
        const orders = await orderModel.find({})
        .populate('user', 'name')
        if(orders){
            console.log(orders)
            res.send(orders)
        }else{
            res.status(404).send({message: 'Orders not found'})
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/:id', isAuth, async(req, res) => {
    const _id = req.params.id
    
    try {
        const order = await orderModel.findById(_id)
        console.log(order)
        if(!order){
            res.status(404).send({message: 'Order not found'})
        }else{
            res.send(order)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.put('/:id/pay', isAuth, async (req, res) => {
    const order = await orderModel.findById(req.params.id)
    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResults = {
            reference: req.body.reference,
            status: req.body.status,
            message: req.body.message,
            transaction: req.body.transaction,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }
        const updateOrder = await order.save()
        res.send({message: 'Order Paid', order: updateOrder})
    }else{
        res.status(404).send({message: 'Order not found'})
    }
})


router.delete('/:id/delete', isAuth, isAdmin, async(req, res) => {
    try {
        const order = await orderModel.findById(req.params.id)
        if(order){
           await order.remove()
           res.send({message: 'Order deleted successfully'})
        }else{
            res.status(404).send({message: 'No order found'})
        }
    } catch (error) {
        res.status(500).send(error) 
    }
})

router.put('/:id/deliver', isAuth, async (req, res) => {
    const order = await orderModel.findById(req.params.id)
    if(order){
        order.isDelivered = true
        order.deliveredAt = Date.now()
        const updateOrder = await order.save()
        res.send({message: 'Order Updated', order: updateOrder})
    }else{
        res.status(404).send({message: 'Order not found'})
    }
})


module.exports = router