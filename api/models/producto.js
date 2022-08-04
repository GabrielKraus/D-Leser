import mongoose from 'mongoose'
const {Schema, model} = mongoose

const productoCollection = `productos`

const ProductoSchema = new mongoose.Schema({
    id: mongoose.ObjectId,
    timeStamp: { type : Date, default: Date.now },
    title: {type: String},
    description: {type: String},
    code: {type: Number},
    thumbnail: {type: String},
    price: {type: Number},
    stock: {type: Number},

})

const ProductModel = model(productoCollection, ProductoSchema)

export default ProductModel