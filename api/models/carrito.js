import mongoose from 'mongoose'
const {Schema, model} = mongoose

const carritoCollection = `carritos`

const CarritoSchema = new mongoose.Schema({
    id: mongoose.ObjectId,
    timeStamp: { type : Date, default: Date.now },
    productos: { type : Array}
})

const CarritoModel = model(carritoCollection, CarritoSchema)

export default CarritoModel