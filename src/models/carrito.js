import mongoose from 'mongoose'
const {Schema, model} = mongoose

const CarritoCollection = `carritos`

const CarritoSchema = new Schema({
    id: mongoose.ObjectId,
    timeStamp: { type : Date, default: Date.now },
    productos: { type : Array}
})

const CarritoModel = model(CarritoCollection, CarritoSchema)

export { CarritoModel, CarritoSchema };
