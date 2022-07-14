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

let administrador = true
//#region Productos
routerProductos.get("/", (req, resPost) => {
    fs.readFile("./productos.txt", 'utf8', (err, data) => {
        if (err) {
            console.log("error")
        }
        resPost.json(JSON.parse(data))
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



if(administrador){
    routerProductos.post("/", (req, res) => {
        fs.readFile("./productos.txt", 'utf8', (err, data) => {
            if (err) {
                console.log("error")
            }
            productos = JSON.parse(data)
            const newProduct = {
                id: productos.length,
                timeStamp: new Date(Date.now()).toLocaleString(),
                title: req.body.title,
                description: req.body.description,
                code: req.body.code,
                thumbnail: req.body.thumbnail,
                price: req.body.price,
                stock: req.body.stock            
                
            };
            productos.push(newProduct)
            fs.writeFile("./productos.txt", JSON.stringify(productos, null, 2), err => {
                if (err) {
                    console.error(err);
                }
                res.json(newProduct)
            });
        });
    })
    
    
    routerProductos.put("/:id", (req, res) => {
        let id = parseInt(req.params.id)
        fs.readFile("./productos.txt", 'utf8', (err, data) => {
            if (err) {
                console.log("error")
            }
            let productos = JSON.parse(data)
            let productoEditado = req.body;
            let productoEncontrado = productos.find(producto => producto.id == id)
            productos[productos.indexOf(productoEncontrado)] = {
                id: productoEncontrado.id, 
                timeStamp: productoEncontrado.timeStamp,
                title: productoEditado.title,
                description: productoEditado.description,
                code: productoEditado.code,
                thumbnail: productoEditado.thumbnail,
                price: productoEditado.price,
                stock: productoEditado.stock
                }
            fs.writeFile("./productos.txt", JSON.stringify(productos, null, 2), err => {
                if (err) {
                    console.error(err);
                }
                res.json(productos)
            });
        });
    
        
        
    })
    
    
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
}




//#endregion


//#region Carritos
routerCarritos.get("/", (req, resPost) => {
    fs.readFile("./carrito.txt", 'utf8', (err, data) => {
        if (err) {
            console.log("error")
        }
        resPost.json(JSON.parse(data))
    });
})



routerCarritos.get("/:id", (req, res) => {
    let id = parseInt(req.params.id)
    fs.readFile("./carrito.txt", 'utf8', (err, data) => {
        if (err) {
            console.log("error")
        }
        let carritos = JSON.parse(data)
        let carrito = carritos.find(carrito => carrito.id == id)
        res.json(carrito)
    });
})



if (administrador){
    routerCarritos.post("/", (req, res) => {
        fs.readFile("./carrito.txt", 'utf8', (err, data) => {
            if (err) {
                console.log("error")
            }
            carritos = JSON.parse(data)
            const newCarrito = {
                id: carritos.length,
                timeStamp: new Date(Date.now()).toLocaleString(),
                productos: req.body.productos
            };
            carritos.push(newCarrito)
            fs.writeFile("./carrito.txt", JSON.stringify(carritos, null, 2), err => {
                if (err) {
                    console.error(err);
                }
                res.json(newCarrito)
            });
        });
    })
    
    
    routerCarritos.put("/:id", (req, res) => {
        let id = parseInt(req.params.id)
        fs.readFile("./carrito.txt", 'utf8', (err, data) => {
            if (err) {
                console.log("error")
            }
            let carritos = JSON.parse(data)
            let carritoEditado = req.body;
            let carritoEncontrado = carritos.find(carrito => carrito.id == id)
            carritos[carritos.indexOf(productoEncontrado)] = { 
                id: carritoEncontrado.id,
                timeStamp: carritoEncontrado.timeStamp,
                productos: carritoEditado.productos
            }
            fs.writeFile("./carrito.txt", JSON.stringify(carritos, null, 2), err => {
                if (err) {
                    console.error(err);
                }
                res.json(carritos)
            });
        });
    })
    
    
    routerCarritos.delete("/:id", (req, res) => {
        let id = parseInt(req.params.id)
    
        fs.readFile("./carrito.txt", 'utf8', (err, data) => {
            if (err) {
                console.log("error")
            }
            let carritos = JSON.parse(data)
            let carrito = carritos.find(carrito => carrito.id == id)
    
            carritos.splice(carritos.indexOf(carrito), 1)
    
            fs.writeFile("./carrito.txt", JSON.stringify(carritos, null, 2), err => {
                if (err) {
                    console.error(err);
                }
                res.json(carritos)
            });
        });
    })

    routerCarritos.delete("/:id/productos/:id_prod", (req, res) => {
        let id = parseInt(req.params.id)
        let idProd = parseInt(req.params.id_prod)
    
        fs.readFile("./carrito.txt", 'utf8', (err, data) => {
            if (err) {
                console.log("error")
            }
            let carritos = JSON.parse(data)
            let carrito = carritos.find(carrito => carrito.id == id)
            let productos = carrito.productos
            let producto =  productos.find(producto => producto.id == idProd)

    
            productos.splice(productos.indexOf(producto), 1)


    
            fs.writeFile("./carrito.txt", JSON.stringify(carritos, null, 2), err => {
                if (err) {
                    console.error(err);
                }
                res.json(carritos)
            });
        });
    })
}
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


