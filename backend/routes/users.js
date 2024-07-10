const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//fetch the userdata
router.get('/', async(req, res) =>{
    const userList = await User.find();

    if(!userList){
        res.status(500).json({success: false})
    }
    res.send(userList);
});

//fetch the user by id

router.get('/:id', async(req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash');

    if(!user){
        res.status(500).json({message: 'The user not found'});
    }
    res.status(200).send(user);
});



// create the user

router.post('/register', async(req, res) =>{

    const record = await User.findOne({'email': req.body.email});
    if(record){
        return res.status(400).send(
            {message:'The user is already registered'}
        );
    }else{
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            isAdmin: req.body.isAdmin,
            
        });

        user = await user.save();

        if(!user){
            return res.status(400).send('The user cannot be created');
        }
        res.send(user);
    }
});

//login the user

router.post('/login', async(req, res) => {

    if(req.body.email == null){
        return res.status(400).send('Please enter email')
    }
    
    if(req.body.password == null || req.body.email == null){
        return res.status(400).send('Please enter password')
    }

    const user = await User.findOne({email: req.body.email});
    const secret = process.env.secret;
    if(!user){
        return res.status(400).send('The user not found');
    }

    if(user.passwordHash && bcrypt.compareSync(req.body.password, user.passwordHash)){
        const token = jwt.sign({
            userId: user.id,
            isAdmin: user.isAdmin
        }, secret, {expiresIn: '1d'});

        res.status(200).send({user: user.email, token: token, isAdmin: user.isAdmin});
    }else{
        res.status(400).send('The password is wrong');
    
    }

    

});

//update user

router.put('/:id', async(req, res) => {
});

//delete the user

router.delete('/:id', async(req, res) => {});


//logout
router.post('/logout', async (req, res) => {
    res.status(200).send({ token: null , message:'User logged out'});
});


module.exports = router;