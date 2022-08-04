import express from 'express'
const { Router } = express;

const app = express();

const routerProductos = express.Router();


const routerCarritos = express.Router();

routerProductos.use(express.json())
routerProductos.use(express.urlencoded({ extended: true }))

routerCarritos.use(express.json())
routerCarritos.use(express.urlencoded({ extended: true }))

app.use(express.json());
app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarritos);
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

import controller from './controller/controller.js';
controller();
let administrador = true
//#region Productos
import ProductModel from './models/producto.js'

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

//#endregion

//#region Carritos

import CarritoModel from './models/carrito.js'


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

//#endregion











const PORT = 8080 || process.env.PORT;
const connectedServer = app.listen(PORT, function () {
    console.log(
        `Servidor Http escuchando en el puerto ${connectedServer.address().port
        }`
    );
});
connectedServer.on("error", (error) =>
    console.log(`Error en servidor ${error}`)
);


