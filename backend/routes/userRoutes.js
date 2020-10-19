const express = require('express')
const UserModel = require('../Models/UserModel')
const router = express.Router()
const {getToken} = require('../utils')

router.post('/signin', async (req, res) => {
        const signInUser = await UserModel.findOne({
            email: req.body.email,
            password: req.body.password
        })
        if(signInUser){
            res.send({
                _id: signInUser.id,
                name: signInUser.name,
                email: signInUser.email,
                isAdmin: signInUser.isAdmin,
                token: getToken(signInUser)
            })
          
        }else{
            res.status(401).send({msg: 'Invalid email and password'})
        }

})

router.post('/register', async (req, res) => {

    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
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
        res.status(401).send({msg: 'Invalid user data'})
    }
    

})


router.get('/createadmin', async (req, res) => {
   try {
        const user = new UserModel({
            name: 'hakkym',
            email: 'akboiy75@gmail.com',
            password: '12345',
            isAdmin: true
        })
    
        const newUser = await user.save()
        res.send(newUser)
    } catch (error) {
        res.status(404).send({msg: error.message})
       
   }

})

module.exports = router