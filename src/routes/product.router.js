import { Router } from "express";
import {ProductModel} from '../models/producto.js'
import { ProductDao } from "../daos/index.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const routerProductos = Router();

let administrador = true



routerProductos.get("/", async (req, resPost) => {
    // const productList = await ProductModel.find({})

    const productList = await ProductDao.getAll()

    resPost.send(productList)
})
routerProductos.get("/:id", async (req, res) => {
    let id = req.params.id
    const product = await ProductDao.getById(id)
    res.send(product)
})
routerProductos.post("/",isAdmin, async (req, res) => {
    const producto = {
        title: req.body.title,
        description: req.body.description,
        code: req.body.code,
        thumbnail: req.body.thumbnail,
        price: req.body.price,
        stock: req.body.stock
    };
    const productoSaved = await ProductDao.save(producto);
    res.send(productoSaved);
})
routerProductos.put("/:id",isAdmin, async (req, res) => {
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