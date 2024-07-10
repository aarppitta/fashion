const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

router.get('/',async(req, res) => {
    const contact = await Contact.find();

    if(!contact){
        res.status(500).json({success:false})
    }
    res.send(contact);
})


// adding the contact in database

router.post('/', async(req,res) => {
    const contact = new Contact({
        name:req.body.name,
        email:req.body.email,
        message:req.body.message,
    })
    con = await contact.save();

    if(!con)
    return res.status(404).send('contact cannot be created')

    res.send(con);
});

module.exports = router;