const express = require("express");
const { Router } = express;
const fs = require("fs");

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
//#region Productos
routerProductos.get("/", (req, resPost) => {
    fs.readFile("./productos.txt", 'utf8', (err, data) => {
        if (err) {
            console.log("error")
        }
        resPost.json( JSON.parse(data))
    });
})



routerProductos.get("/:id", (req, res) => {
    let id = parseInt(req.params.id)
    fs.readFile("./productos.txt", 'utf8', (err, data) => {
        if (err) {
            console.log("error")
        }
        let productos = JSON.parse(data)
        let producto = productos.find(producto => producto.id == id)
        res.json(producto)
    });
})


let ListaProductos = [];
routerProductos.post("/", (req, res) => {
    const newProduct = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
        timeStamp: new Date(Date.now()).toLocaleString(),
        id: ListaProductos.length
    };
    ListaProductos.push(newProduct)
    fs.writeFile("./productos.txt", JSON.stringify(ListaProductos, null, 2), err => {
        if (err) {
            console.error(err);
        }
        res.json(newProduct)
    });
})


// routerProductos.put("/:id", (req, res) => {
//     let id = parseInt(req.params.id)

//     let producto = req.body;
//     let productoEncontrado = productos.find(producto => producto.id === id);

//     productoEncontrado.nombre = producto.nombre;
//     productoEncontrado.precio = producto.precio;

//     productos[productos.indexOf(productoEncontrado)] = { ...producto, id: productoEncontrado.id }
//     res.json(
//         { productos }
//     )
// })


routerProductos.delete("/:id", (req, res) => {
    let id = parseInt(req.params.id)

    fs.readFile("./productos.txt", 'utf8', (err, data) => {
        if (err) {
            console.log("error")
        }
        let productos = JSON.parse(data)
        let producto = productos.find(producto => producto.id == id)

        productos.splice(productos.indexOf(producto), 1)

        fs.writeFile("./productos.txt", JSON.stringify(productos, null, 2), err => {
            if (err) {
                console.error(err);
            }
            res.json(productos)
        });
    });
})


//#endregion


//#region Carritos
//#endregion











const PORT = 8080 || process.env.PORT;
const connectedServer = app.listen(PORT, function () {
    console.log(
        `Servidor Http con Websockets escuchando en el puerto ${connectedServer.address().port
        }`
    );
});
connectedServer.on("error", (error) =>
    console.log(`Error en servidor ${error}`)
);


