const express = require("express");
const { Router } = express;

const app = express();
const router = express.Router();
router.use(express.json())
router.use(express.urlencoded({extended: true}))

app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.json());
app.use('/api/productos', router);
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))


class Product {
    constructor(title, price, thumbnail, id){
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
    },{
        title: "Libro2",
        price: 250,
        thumbnail: "foto",
        id: 2
    }
];

router.get('/', (req, res)  => {
    res.render('productos', {productos: productos})
})
router.get('/agregar', (req, res)  => {
    res.render('agregarProducto', {productos: productos})
})

router.post("/", (req, res)=>{
    newProduct = new Product(req.body.title, req.body.price, req.body.thumbnail, productos.length+1)
    productos.push(newProduct)
    res.render('productos', {productos: productos})
})


router.delete("/:id", (req, res)=>{
    let productId = parseInt(req.params.id)
    productos.splice(productos.indexOf(productos.find(el=> el.id==productId)),1)
    res.json({
        productos
    })
})

const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})
server.on("error", error => console.log(`error en el servidor ${error}`));