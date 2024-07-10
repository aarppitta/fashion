const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
        default:''
    },
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;