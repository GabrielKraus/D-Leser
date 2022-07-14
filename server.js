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


class Contenedor {
    constructor(nombre) {
        this.nombre
    }
    // async  getAll(archivo) {
    //     try {
    //         const datos = await fs.promises.readFile(archivo);
    //         return datos;
    //     } catch (error) {
    //         console.log(error);
    //         return [];
    //     }
    // }
    // save(obj) {
    //     const datos =  this.getAll();
    //     if (datos.length === 0) {
    //         obj.id = 1;
    //     } else {
    //         obj.id = datos[datos.length - 1].id + 1;
    //     }
    //     datos.push(obj);
    //     fs.writeFile(
    //         this.nombre,
    //         JSON.stringify(datos, null, 2)
    //     );
    // }
}

let archivoProductos = new Contenedor("productos.txt")
let archivoCarrito = new Contenedor("carrito")




//#region Productos
class Product {
    constructor(title, price, thumbnail, timeStamp, id) {
        this.title = title,
            this.price = price,
            this.thumbnail = thumbnail,
            this.timeStamp = timeStamp
        this.id = id
    }
}

// const ListaProductos = [{
//     title: "Libro1",
//     price: 150,
//     thumbnail: "foto",
//     timeStamp: Date.now,
//     id: 1
// }, {
//     title: "Libro2",
//     price: 250,
//     thumbnail: "foto",
//     id: 2
// }
// ];




routerProductos.get("/", (req, resPost) => {
    // resPost.json(fs.promises.readFile(archivoProductos))

    // fs.readFile("./productos.txt", (error, res) => {
    //     resPost.json(res)
    // })

    fs.readFile("./productos.txt", 'utf8', (err, data) => {
        if (err) {
            console.log("error")
        }
        resPost.json(data)
    });
})



// routerProductos.get("/:id", (req, res) => {
//     let id = parseInt(req.params.id)
//     let producto = productos.find(producto => producto.id == id)
//     if (producto != null) {
//         res.json(
//             producto
//         )
//     } else {
//         res.send({ error: `no existe el producto con el id ${id}` })
//     }
// })

routerProductos.post("/", (req, res) => {
    ListaProductos = []
    fs.readFile("./productos.txt", 'utf8', (err, data) => {
        if (err) {
            console.log("error")
        }
        ListaProductos = data
    });
    const newProduct = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    };
    // productList.push(newProduct)
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


// routerProductos.delete("/:id", (req, res) => {
//     let productId = parseInt(req.params.id)
//     productos.splice(productos.indexOf(productos.find(el => el.id == productId)), 1)
//     res.json({
//         productos
//     })
// })


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


