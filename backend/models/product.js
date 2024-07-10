const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    richDescription:{
        type:String,
        default:''
    },
    image:{
        type:String,
        default:''
    },
    price:{
        type:Number,
        default:0
    },
    stock:{
        type:Number,
        required:true,
        min:0,
        max:255
    },
    isFeatured:{
        type:Boolean,
        default:false
    },
    dateCreated:{
        type:Date,
        default:Date.now
    }
});

productSchema.set('toJSON', {
    virtuals:true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;