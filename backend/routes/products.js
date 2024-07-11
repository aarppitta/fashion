const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const mongoose = require('mongoose');
const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/jpg':'jpg'
}


//upload image
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');
        if(isValid){
            uploadError = null
        }
        cb(uploadError,'public/uploads/')
    },
    filename: function(req,file,cb){
        const extension = FILE_TYPE_MAP[file.mimetype];
        const filename = file.originalname.split(' ').join('-');
        cb(null,`${filename}-${Date.now()}.${extension}` )
    }
})
const uploadOptions = multer({storage:storage});


//get all products

router.get('/', async(req, res) => {
    const productList = await Product.find();

    if(!productList){
        res.status(500).json({success: false})
    }
    res.send(productList);
});

//get product by id

router.get('/:id', async(req, res) => {
    const productId = await Product.findById(req.params.id);

    if(!productId){
        res.status(500).json({message: 'The product not found'});
    }
    res.status(200).send(productId);
});

//add new product
router.post('/', uploadOptions.single('image'), async(req, res) => {

    const file = req.file;
    if(!file)
        return res.status(400).send('No image in the request');

    const fileName = req.file.filename;
    const basePath =`${req.protocol}://${req.get('host')}/public/uploads/`;
    console.log(basePath)


    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: `${basePath}${fileName}`,
        price: req.body.price,
        stock: req.body.stock,
        isFeatured: req.body.isFeatured
    });

    product = await product.save();

    if(!product){
        return res.status(500).send('The product cannot be created');
    }
    res.send(product);
});

//update product

router.put('/:id', async(req, res) => {

    const updateProduct = await Product.fineById(req.params.id);

    if(!updateProduct){
        res.status(500).json({message: 'The product not found'});
    }

    updateProduct = { 
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        price: req.body.price,
        countInStock: req.body.countInStock,
        isFeatured: req.body.isFeatured
    }

    update = await Product.updateOne(updateProduct);
    if(!update){
        return res.status(500).send('The product cannot be updated');
    }
    res.send(updateProduct);
});

//delete product

router.delete('/:id', async(req, res) => {
    Product.findByIdAndDelete(req.params.id).then(product => {
        if(product){
            return res.status(200).json({success: true, message: 'The product is deleted'});
        }else{
            return res.status(404).json({success: false, message: 'The product not found'});
        }
    }).catch(err => {
        return res.status(400).json({success: false, error: err});
    });
});

module.exports = router;
