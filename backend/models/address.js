const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product : { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required},
    country: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    postcode: { type: String, required: true },
    apartment: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    notes:{ type: String },
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;