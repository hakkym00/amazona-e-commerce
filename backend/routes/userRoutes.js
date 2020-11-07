const express = require('express')
const bcrypt =  require('bcryptjs')
const UserModel = require('../Models/UserModel')
const router = express.Router()
const {getToken, isAuth} = require('../utils')

router.post('/signin', async (req, res) => {
    try {
        const signInUser = await UserModel.findOne({
            email: req.body.email,
        })
        if(signInUser){
            const compared = await bcrypt.compare(req.body.password, signInUser.password)
            if(compared){
                res.send({
                    _id: signInUser.id,
                    name: signInUser.name,
                    email: signInUser.email,
                    isAdmin: signInUser.isAdmin,
                    token: getToken(signInUser)
                })
            }else{
                res.status(401).send({message: 'Invalid email and password'})
            }
          
        }else{
            res.status(401).send({message: 'Invalid email and password'})
        }
    } catch (error) {
        res.send({message: error.message})
    }

})

router.post('/register', async (req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        console.log(user)
        const newUser = await user.save()
        if(newUser){
            res.send({
                _id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token: getToken(newUser)
            })
          
        }else{
            res.status(401).send({message: 'Invalid user data'})
        }
    } catch (error) {
        res.send({message: error.mesage})
    }
    

})


router.get('/createadmin', async (req, res) => {
   try {
        const hashedPassword = await bcrypt.hash('12345', 10)
        const user = new UserModel({
            name: 'hakkym',
            email: 'akboiy75@gmail.com',
            password: hashedPassword,
            isAdmin: true
        })
    
        const newUser = await user.save()
        res.send(newUser)
    } catch (error) {
        res.status(404).send({message: error.message})
       
   }

})

router.get('/:id',isAuth , async (req, res) => {
    
    try {
        const user = await UserModel.findById(req.params.id)
        if(user){
            res.send(user)
        }else{
        res.status(404).send({mesage: 'User not found'})
    }
    } catch (error) {
        res.send({message: error.mesage})
    }
})

router.put('/update/:id', isAuth, async (req, res) => {
    try {
        console.log(req.body)
        const user = await UserModel.findById(req.params.id)
        console.log(user)
        if(user){
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            if(req.body.password){
                const hashedPassword = await bcrypt.hash(req.body.password, 10)
                user.password = hashedPassword
            }
            const updatedUser = await user.save()
            console.log(updatedUser)
            res.send({
                _id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: getToken(updatedUser)
            })
        }
    } catch (error) {
        res.send({message: error.mesage})
    }
} )

module.exports = router