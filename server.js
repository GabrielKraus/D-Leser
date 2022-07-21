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
const { knexLite } = require(`./options/dataSQLite3`);

class CreateTable {
    constructor(tableName) {
        this.tableName = tableName
    }
    createTable = async(knex)=>{

        let tableStatus = await (knex.schema.hasTable(this.tableName))
        if(!tableStatus)
            {await knex.schema.createTable(this.tableName, table=>{
                table.string('title');
                table.float('price');
                table.string('thumbnail');
                table.timestamp('timeStamp').defaultTo(knex.fn.now())
                table.increments('id').primary();
            })
            console.log(`tabla ${this.tableName} creada`)
        }else{
            console.log(`la tabla productos ya existe`)
        }
        
    }
    getData = async (knex) => {
        let rows = await knex.from(this.tableName).select("*")
        let list = []
        for(const row of rows) {
            list.push({
                title: row["title"],
                price: row["price"],
                thumbnail: row["thumbnail"],
                timeStamp: row["timeStamp"],
                id: row["id"]
            })
        }
        
        return list;
    }
    getDataById = async (knex, id)=>{
        let prod = await knex(this.tableName).select("*").where({id: id})
        return{
                title: prod[0]["title"],
                price: prod[0]["price"],
                thumbnail: prod[0]["thumbnail"],
                timeStamp: prod[0]["timeStamp"],
                id: prod[0]["id"]
        }
    }
    insertData = async (knex, title, price, thumbnail) =>{
        await knex(this.tableName).insert(
            {title: title, price: price, thumbnail: thumbnail}
        )
    }
    updateData = async (knex, id, title, price, thumbnail)=>{
        await knex(this.tableName).where({id: id}).update( {
            title: title,
            price: price,
            thumbnail: thumbnail
        })
    }
    deleteData = async (knex, id) =>{
        await knex(this.tableName).where({id: id}).del()
    }
}



class CreateTableMensajes {
    constructor(tableName) {
        this.tableName = tableName
    }
    createTable = async(knex)=>{

        let tableStatus = await (knex.schema.hasTable(this.tableName))
        if(!tableStatus)
            {await knex.schema.createTable(this.tableName, table=>{
                table.string('email');
                table.string('mensaje');
                table.timestamp('timeStamp').defaultTo(knex.fn.now())
                table.increments('id').primary();
            })
            console.log(`tabla ${this.tableName} creada`)
        }else{
            console.log(`la tabla mensajes ya existe`)
        }
        
    }
    getData = async (knex) => {
        let rows = await knex.from(this.tableName).select("*")
        let list = []
        for(const row of rows) {
            list.push({
                email: row["email"],
                mensaje: row["mensaje"],
                timeStamp: row["timeStamp"],
                id: row["id"]
            })
        }
        
        return list;
    }
    insertData = async (knex, email, mensaje) =>{
        await knex(this.tableName).insert(
            {email: email, mensaje: mensaje}
        )
    }
}


//#region productos

const productos = new CreateTable("productos")
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

const mensajess = new CreateTableMensajes("mensajes")
mensajess.createTable(knexLite);



io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado!");


    let productList = await productos.getData(knex)
    socket.emit("productos", productList)


    socket.on('nuevoProducto', async producto => {
        productos.insertData(knex, producto.title,producto.price,producto.foto)

        io.sockets.emit("productos", await productos.getData(knex));
    })






    let mensajes = await mensajess.getData(knexLite)
    socket.emit("mensajes", mensajes);

    socket.on('nuevoMensaje', async mensaje => {
        mensajess.insertData(knexLite, mensaje.email,mensaje.mensaje)
        io.sockets.emit('mensajes', await mensajess.getData(knexLite));
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


