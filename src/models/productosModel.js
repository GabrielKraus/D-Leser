import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    id: mongoose.ObjectId,
    title: {type: String},
    description: {type: String},
    code: {type: Number},
    thumbnail: {type: String},
    price: {type: Number},
    stock: {type: Number},

}, {timestamps:true})

export const ProductosModel = mongoose.model("productos", Schema);