import mongoose from "mongoose";

const collection = 'Users';
const schema = mongoose.Schema({
    nombre: String,
    apellido:String,
    email:String,
    password:String,
    edad:Number,
    direccion: String,
    telefono:Number,
    foto:String,
    carrito:[{type: mongoose.Schema.Types.ObjectId, ref: 'carritos'}]
}, {timestamps:true})


const userService = mongoose.model(collection, schema)

export default userService;