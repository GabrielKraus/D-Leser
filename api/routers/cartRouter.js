import { Router } from "express";
import {CarritoModel} from '../models/carrito.js'

const routerCarritos = Router();

let administrador = true


routerCarritos.get("/", async (req, resPost) => {
    const carritoList = await CarritoModel.find({})
    resPost.json(carritoList)
})
routerCarritos.get("/:id", async (req, res) => {
    let id = req.params.id
    const carrito = await CarritoModel.find({_id: id})
    res.json(carrito)
})
routerCarritos.post("/", (req, res) => {
    if(administrador){
        const carrito = {
            productos: req.body.productos
        };
        const carritoSaved = new CarritoModel(carrito)
        carritoSaved.save();
        res.json(carrito)
    }else{
        res.json({error: `-1, descripcion ruta /api/carrito metodo POST no autorizada`})
    }
})
routerCarritos.put("/:id", async (req, res) => {
    let id = req.params.id
    if(administrador){
        let carritoEditado = req.body;
        let carritoUpdate = await CarritoModel.updateMany({_id: id},{
            $set: {
                productos: carritoEditado.productos
            }
        })
        const carritoList = await CarritoModel.find({})

        res.json(carritoList)
    }else{
        res.json({error: `-1, descripcion ruta /api/carrito/${id} metodo PUT no autorizada`})
    }
})
routerCarritos.delete("/:id", async (req, res) => {
    let id = req.params.id
    const carritoList = await CarritoModel.find({})
    if(administrador){
        let  carritoDelete =  await CarritoModel.deleteOne({_id: id})
        res.json(carritoList)
    }else{
        res.json({error: `-1, descripcion ruta /api/carrito/${id} metodo DELETE no autorizada`})
    }
})
routerCarritos.delete("/:id/productos/:id_prod", async (req, res) => {
    let id = req.params.id
    let idProd = req.params.id_prod

    const carrito = await CarritoModel.find({_id: id})
    console.log(carrito)

    const productos = carrito.productos

    console.log(productos)

    res.json(productos)
})

export { routerCarritos };