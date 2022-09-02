import mongoose from "mongoose";

const collection = 'Users';
const schema = mongoose.Schema({
    nombre: String,
    apellido:String,
    email:String,
    password:String,
    edad:Number
}, {timestamps:true})


const userService = mongoose.model(collection, schema)

export default userService;