const express = require("express");
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const { Router } = express;

const app = express();
const router = express.Router();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

app.use(express.json());
app.use('/api/productos', router);
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))


class Product {
    constructor(title, price, thumbnail, id) {
        this.title = title,
            this.price = price,
            this.thumbnail = thumbnail,
            this.id = id
    }
}

const productos = [{
    title: "Libro1",
    price: 150,
    thumbnail: "foto",
    id: 1
}, {
    title: "Libro2",
    price: 250,
    thumbnail: "foto",
    id: 2
}
];

app.get("/", (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})


router.get("/", (req, res) => {
    res.json(productos)
})



router.get("/:id", (req, res) => {
    let id = parseInt(req.params.id)
    let producto = productos.find(producto => producto.id == id)
    if (producto != null) {
        res.json(
            producto
        )
    } else {
        res.send({ error: `no existe el producto con el id ${id}` })
    }
})

router.post("/", (req, res) => {
    newProduct = new Product(req.body.title, req.body.price, req.body.thumbnail, productos.length + 1)
    productos.push(newProduct)
    res.json(newProduct)
})


router.put("/:id", (req, res) => {
    let id = parseInt(req.params.id)

    let producto = req.body;
    let productoEncontrado = productos.find(producto => producto.id === id);

    productoEncontrado.nombre = producto.nombre;
    productoEncontrado.precio = producto.precio;

    productos[productos.indexOf(productoEncontrado)] = { ...producto, id: productoEncontrado.id }
    res.json(
        { productos }
    )
})


router.delete("/:id", (req, res) => {
    let productId = parseInt(req.params.id)
    productos.splice(productos.indexOf(productos.find(el => el.id == productId)), 1)
    res.json({
        productos
    })
})



const mensajes = [];

io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado!");

    socket.emit("productos", productos)

    socket.emit("mensajes", mensajes);

    socket.on('nuevoMensaje', mensaje => {
        mensajes.push(mensaje);
        io.sockets.emit('mensajes', mensajes);
    })

    

});

const PORT = 8080 || process.env.PORT;
const connectedServer = httpServer.listen(PORT, function () {
    console.log(
        `Servidor Http con Websockets escuchando en el puerto ${connectedServer.address().port
        }`
    );
});
connectedServer.on("error", (error) =>
    console.log(`Error en servidor ${error}`)
);


