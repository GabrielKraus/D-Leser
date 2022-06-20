const express = require("express");
const { Router } = express;



const app = express();
const router = express.Router();
app.use(express.json());

app.use('/api/productos', router);

router.use(express.json())


const productos = [{
        title: "Libro1",
        price: 150,
        thumbnail: "(url al logo o foto del producto)",
        id: 1
    },{
        title: "Libro2",
        price: 250,
        thumbnail: "(url al logo o foto del producto)",
        id: 2
    }
];


router.get("/", (req, res)=>{
    res.json(productos)
})

router.get("/:id", (req, res)=>{
    let id = parseInt(req.params.id)
    let producto = productos.find(producto => producto.id == id)
    if(producto != null){
        res.json(
            producto
        )
    }else{
        res.send({error: `no existe el producto con el id ${id}`})
    }
})

router.post("/", (req, res)=>{
    newProduct = {...req.body, id: productos.length+1}
    productos.push(newProduct)
    res.json(productos)
})


router.put("/:id", (req, res)=>{
    let id = parseInt(req.params.id)

    let producto = req.body;
    let productoEncontrado = productos.find(producto => producto.id === id);

    productoEncontrado.nombre = producto.nombre;
    productoEncontrado.precio = producto.precio;

    productos[productos.indexOf(productoEncontrado)] = {...producto, id: productoEncontrado.id}
    res.json(
        {productos}
    )
})


router.delete("/:id", (req, res)=>{
    let productId = parseInt(req.params.id)
    productos.splice(productos.indexOf(productos.find(el=> el.id==productId)),1)
    res.json({
        productos
    })
})

const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})
server.on("error", error => console.log(`error en el servidor ${error}`));