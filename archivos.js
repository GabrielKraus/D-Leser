const fs = require('fs');
class Contenedor {
    constructor(nombre) {
        this.nombre = nombre
    }
    static id = 0
    static productArray = []
    save(obj) {
        Contenedor.id++
        obj['id'] = Contenedor.id
        Contenedor.productArray.push(obj)
        fs.writeFile(`./${this.nombre}`, JSON.stringify(Contenedor.productArray, null, 2), error => {
            if (error) {
                console.log("error")
            } else {
                console.log(`La id del producto ${obj['title']} es: ${obj['id']}`)
            }
        })
        return obj['id']
    }
    getById(id) {
        fs.readFile(`./${this.nombre}`, (error, res) => {
            if (error) {
                console.log("error")
            } else {
                let products = JSON.parse(res)
                console.log(products.find(product => product.id == id))
            }
        })
    }
    getAll() {
        fs.readFile(`./${this.nombre}`, (error, res) => {
            if (error) {
                console.log("error")
            } else {
                console.log(JSON.parse(res))
            }
        })
    }
    deleteById(id) {
        fs.readFile(`./${this.nombre}`, (error, res) => {
            if (error) {
                console.log("error")
            } else {
                let products = JSON.parse(res)
                const index = products.findIndex(product => {
                    return product.id == id;
                });
                Contenedor.productArray.splice(index, 1)
                fs.writeFile(`./${this.nombre}`, JSON.stringify(Contenedor.productArray, null, 2), error => {
                    if (error) {
                        console.log("error")
                    }
                })
            }
        })
    }
    deleteAll() {
        fs.readFile(`./${this.nombre}`, (error, res) => {
            if (error) {
                console.log("error")
            } else {
                fs.writeFile(`./${this.nombre}`, JSON.stringify([]), error => {
                    if (error) {
                        console.log("error")
                    }
                })
            }
        })
    }
}


let archivo = new Contenedor("productos.txt")

archivo.save({ title: "producto1", price: 50, thumbnail: "https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2020/12/The-Mandalorian-Grogu.jpg?fit=1280%2C720&quality=80&ssl=1" })
archivo.save({ title: "producto2", price: 100, thumbnail: "https://img.europapress.es/fotoweb/fotonoticia_20220216180422_420.jpg" })
archivo.save({ title: "producto3", price: 200, thumbnail: "https://as01.epimg.net/meristation/imagenes/2022/05/19/noticias/1652944408_523527_1652944740_noticia_normal.jpg" })


// arch.getAll()

archivo.deleteAll()




