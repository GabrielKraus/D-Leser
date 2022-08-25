const express = require("express");
const { Server: HttpServer } = require('http')
const { Router } = express;
const app = express();
const router = express.Router();
const httpServer = new HttpServer(app)
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

app.use(express.json());
const routerProductos = Router();
app.use('/api/productos', routerProductos);
const routerMensajes = Router();
app.use('/api/mensajes', routerMensajes);
const routerMensajesTest = Router();
app.use('/api/mensajes-test', routerMensajes);
const routerProductosTest = Router();
app.use('/api/productos-test', routerProductosTest);
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

const{normalize, schema, denormalize} = require("normalizr")

const { knex } = require(`./options/mariaDB`);

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
            console.log(`la tabla ${this.tableName} ya existe`)
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
                table.string('mensaje');
            })
            console.log(`tabla ${this.tableName} creada`)
        }else{
            console.log(`la tabla ${this.tableName} ya existe`)
        }
        
    }
    getData = async (knex) => {
        let rows = await knex.from(this.tableName).select("*")
        let list = []
        for(const row of rows) {
            list.push({
                mensaje: row["mensaje"]
            })
        }
        
        return list;
    }
    insertData = async (knex, mensaje) =>{
        await knex(this.tableName).insert(
            {mensaje: mensaje}
        )
    }
}

app.get("/", (req, res) => {
    res.render("pages/index")
})

//#region productos

const productos = new CreateTable("productos")
productos.createTable(knex);
routerProductos.get("/", async (req, res) => {
    const lista = await productos.getData(knex)
    res.json(lista)
})

routerProductos.get("/:id", async (req, res) => {
    let id = parseInt(req.params.id)
    const prod = await productos.getDataById(knex, id)
    res.json(prod)
})

routerProductos.post("/", async (req, res) => {
    productos.insertData(knex, req.body.title,req.body.price,req.body.thumbnail)
    const lista = await productos.getData(knex)
    res.json(lista)
})






routerProductos.put("/:id", async (req, res) => {
    let id = parseInt(req.params.id)

    let producto = req.body;

    productos.updateData(knex, id, producto.title, producto.price, producto.thumbnail)

    const lista = await productos.getData(knex)
    res.json(lista)
})


routerProductos.delete("/:id", async(req, res) => {
    let id = parseInt(req.params.id)
    productos.deleteData(knex, id)

    const lista = await productos.getData(knex)
    res.json(lista)
})

//#endregion
//#region mensajes-test
const mensajesFake = new CreateTableMensajes("mensajes-test")
mensajesFake.createTable(knex);

const mensajes = require("./util/fakeMessageGenerator")


routerMensajes.get("/", async (req, res) => {
    mensajes.forEach(message => {
        mensajesFake.insertData(knex, message)
    });
    const lista = await mensajesFake.getData(knex)

    const authorSchema = new schema.Entity('authors')
    const textSchema = new schema.Entity('text')
    const messageSchema = new schema.Entity('messages', {
        author:authorSchema,
        text:textSchema
    })

    let messageList=[]
    lista.forEach(msj=>{
        console.log(normalize(JSON.parse(msj.mensaje), messageSchema))
    })

    lista.forEach(msj=>{
        messageList.push(JSON.parse(msj.mensaje))
    })


    res.json(messageList)
});
    


//#endregion

//#region productos-test

const productosFake = new CreateTable("productosFake")
productosFake.createTable(knex);



const data = require("./util/fakeProductsGenerator")

routerProductosTest.get("/", async (req, res) => {
    data.forEach(producto => {
        productosFake.insertData(knex, producto.title, producto.price, producto.thumbnail)
    });
    const lista = await productosFake.getData(knex)
    res.json(lista)
})


//#endregion



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


