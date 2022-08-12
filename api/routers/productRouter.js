import { Router } from "express";
import ProductModel from '../models/producto.js'

const routerProductos = Router();

let administrador = true



routerProductos.get("/", async (req, resPost) => {
    const productList = await ProductModel.find({})
    resPost.json(productList)
})
routerProductos.get("/:id", async (req, res) => {
    let id = req.params.id
    const product = await ProductModel.find({_id: id})
    res.json(product)
})
routerProductos.post("/", (req, res) => {
    if(administrador){
        const producto = {
            title: req.body.title,
            description: req.body.description,
            code: req.body.code,
            thumbnail: req.body.thumbnail,
            price: req.body.price,
            stock: req.body.stock
        };
        const productoSaved = new ProductModel(producto)
        productoSaved.save();
        res.json(producto)
    }else{
        res.json({error: `-1, descripcion ruta /api/productos metodo POST no autorizada`})
    }
})
routerProductos.put("/:id", async (req, res) => {
    let id = req.params.id
    if(administrador){
        let productoEditado = req.body;
        let productoUpdate = await ProductModel.updateMany({_id: id},{
            $set: {
                title: productoEditado.title,
                description: productoEditado.description,
                code: productoEditado.code,
                thumbnail: productoEditado.thumbnail,
                price: productoEditado.price,
                stock: productoEditado.stock
            }
        })
        const productList = await ProductModel.find({})

        res.json(productList)
    }else{
        res.json({error: `-1, descripcion ruta /api/productos/${id} metodo PUT no autorizada`})
    }
})
routerProductos.delete("/:id", async (req, res) => {
    let id = req.params.id
    const productList = await ProductModel.find({})
    if(administrador){
        let  productDelete =  await ProductModel.deleteOne({_id: id})
        res.json(productList)
    }else{
        res.json({error: `-1, descripcion ruta /api/productos/${id} metodo DELETE no autorizada`})
    }
})

export { routerProductos };