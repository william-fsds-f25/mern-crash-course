import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }, 
}, {
    timestamps: true //createdAt, updatedAt
});


const Product = mongoose.model('Product', productSchema); // it creates a model called "product" using the schema "productSchema" with all the options that have been created there.

export default Product;

