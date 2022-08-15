import mongoose from 'mongoose'
const {Schema, model} = mongoose

const ProductoCollection = `productos`

const ProductoSchema = new Schema({
    id: mongoose.ObjectId,
    timeStamp: { type : Date, default: Date.now },
    title: {type: String},
    description: {type: String},
    code: {type: Number},
    thumbnail: {type: String},
    price: {type: Number},
    stock: {type: Number},

})

const ProductModel = model(ProductoCollection, ProductoSchema)

export { ProductModel, ProductoSchema };