const express = require('express')
const app = express()
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))


const fs = require("fs");
class Contenedor {
    constructor(nombre) {
        // podemos simplificar esto, y solo llamar a this.nombre
        this.nombre = `./${nombre}`;
    }
    static id = 0;
    async save(obj) {
        try {
            const productos = await this.getAll();
            if (productos.length === 0) {
                obj.id = 1;
            } else {
                obj.id = productos[productos.length - 1].id + 1;
            }
            productos.push(obj);

            await fs.promises.writeFile(
                this.nombre,
                JSON.stringify(productos, null, 2)
            );
        } catch (error) {
            console.log(error);
        }
    }
    getById(id) {
        fs.readFile(this.nombre, (error, res) => {
            if (error) {
                console.log("error");
            } else {
                let products = JSON.parse(res);
                console.log(products.find((product) => product.id == id));
            }
        });
    }
    async getAll() {

        try {
            const productos = await fs.promises.readFile(this.nombre);
            return JSON.parse(productos);
        } catch (error) {

            console.log(error);
            return [];
        }

    }
    deleteById(id) {
        fs.readFile(this.nombre, (error, res) => {
            if (error) {
                console.log("error");
            } else {
                let products = JSON.parse(res);
                const index = products.findIndex((product) => {
                    return product.id == id;
                });
                Contenedor.productArray.splice(index, 1);
                fs.writeFile(
                    this.nombre,
                    JSON.stringify(Contenedor.productArray, null, 2),
                    (error) => {
                        if (error) {
                            console.log("error");
                        }
                    }
                );
            }
        });
    }
    deleteAll() {
        fs.readFile(`./${this.nombre}`, (error, res) => {
            if (error) {
                console.log("error");
            } else {
                fs.writeFile(`./${this.nombre}`, JSON.stringify([]), (error) => {
                    if (error) {
                        console.log("error");
                    }
                });
            }
        });
    }
}
let archivo = new Contenedor("productos.txt");
// const producto = {
//     title: "producto",
//     price: 200,
//     thumbnail: "https://as01.epimg.net/meristation/imagenes/2022/05/19/noticias/1652944408_523527_1652944740_noticia_normal.jpg",
// };
// archivo.save(producto).then()

app.get('/', (req, res) => {
    res.send("<a href='/productos'>Ver todos los productos</a> <br> <a href='/productoRandom'>ver un producto aleatorio</a>")
})



// let allProducts = []
// archivo.getAll().then(res=>  allProducts = res )


app.get('/productos', async (req, res) => {
    const productos = await archivo.getAll()
    res.send(productos)
})



app.get('/productoRandom', async (req, res) => {
    const productos = await archivo.getAll()
    res.send( productos[Math.floor(Math.random() * (productos.length))] )
})

