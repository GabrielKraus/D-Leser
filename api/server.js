const express = require("express");
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io');
const { PassThrough } = require("stream");
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
app.set("views", "./public");
app.set('view engine', 'ejs')

const { knex } = require(`./options/mariaDB`);

const ModelMensajes = require(`./models/modelMensajes`)

const ModelProductos = require(`./models/modelProductos`)







//#region productos

const productos = new ModelProductos("productos")
productos.createTable(knex);



app.get("/", (req, res) => {
    res.render("pages/index")
})


router.get("/", async (req, res) => {
    const lista = await productos.getData(knex)
    res.json(lista)
})



router.get("/:id", async (req, res) => {
    let id = parseInt(req.params.id)
    const prod = await productos.getDataById(knex, id)
    res.json(prod)
})

// router.post("/", async (req, res) => {
//     productos.insertData(knex, req.body.title,req.body.price,req.body.thumbnail)
//     const lista = await productos.getData(knex)
//     res.json(lista)
// })






router.put("/:id", async (req, res) => {
    let id = parseInt(req.params.id)

    let producto = req.body;

    productos.updateData(knex, id, producto.title, producto.price, producto.thumbnail)

    const lista = await productos.getData(knex)
    res.json(lista)
})


router.delete("/:id", async(req, res) => {
    let id = parseInt(req.params.id)
    productos.deleteData(knex, id)

    const lista = await productos.getData(knex)
    res.json(lista)
})

//#endregion

const mensajess = new ModelMensajes("mensajes")
mensajess.createTable(knex);



io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado!");


    let productList = await productos.getData(knex)
    socket.emit("productos", productList)


    socket.on('nuevoProducto', async producto => {
        productos.insertData(knex, producto.title,producto.price,producto.foto)

        io.sockets.emit("productos", await productos.getData(knex));
    })






    let mensajes = await mensajess.getData(knex)
    socket.emit("mensajes", mensajes);

    socket.on('nuevoMensaje', async mensaje => {
        mensajess.insertData(knex, mensaje.email,mensaje.mensaje)
        io.sockets.emit('mensajes', await mensajess.getData(knex));
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


