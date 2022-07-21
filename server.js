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


class CreateTable {
    constructor(tableName) {
        this.tableName = tableName
    }
    createTable = async(knex)=>{
        await knex.schema.createTable(this.tableName, table=>{
            table.string('title');
            table.float('price');
            table.string('thumbnail');
            table.timestamp('timeStamp').defaultTo(knex.fn.now())
            table.increments('id').primary();
        })
        console.log(`tabla ${this.tableName} creada`)
    }
    getData = async (knex) => {
        let rows = await knex.from(this.tableName).select("*")
        let list = []
        for(const row of rows) {
            list.push({
                tilet: row["title"],
                price: row["price"],
                thumbnail: row["thumbnail"],
                timeStamp: row["timeStamp"],
                id: row["id"]
            })
        }
        console.log(list)
        return list;
    }
    insertData = async (knex, title, price, thumbnail) =>{
        await knex(this.tableName).insert(
            {title: title, price: price, thumbnail: thumbnail}
        )
    }
}


const productos = new CreateTable("productos")
if(!knex.schema.hasTable("productos")){
    productos.createTable(knex);
}else{
    console.log(`la tabla productos ya existe`)
}




// const productos = [{
//     title: "Libro1",
//     price: 150,
//     thumbnail: "foto",
//     id: 1
// }, {
//     title: "Libro2",
//     price: 250,
//     thumbnail: "foto",
//     id: 2
// }
// ];

app.get("/", (req, res) => {
    res.render("pages/index")
})


router.get("/", (req, res) => {
    res.json(productos.getData(knex))
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
    productos.insertData(knex, req.body.title,req.body.price,req.body.thumbnail)
    res.json(productos.getData(knex))
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


