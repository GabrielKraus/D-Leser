import {CarritoService} from "../services/carritoService.js";
import {ProductoService} from "../services/productoService.js";

const carritoService = CarritoService.getInstance();

export async function create(req, res) {
    const newCart = await carritoService.create();

    newCart
        ? res.status(200).json({"success": "Carrito agregado con la id " + newCart._id})
        : res.status(500).json({"error": "Error"})
}
export async function getAllCarts(req, res) {

    const carts = await carritoService.getAll();

    carts
        ? res.status(200).json(carts)
        : res.status(404).json({"error": "no hay carritos para mostrar"})
}



export async function addProduct(req, res) {
    const {id} = req.params;
    const {body} = req;

    const productExists = await ProductoService.exists(body.productId);

    if (productExists) {
        await carritoService.saveProductToCart(id, body)
    } else {
        res.status(404).json({"error": "producto no encontrado"});
    }
}


export async function removeProduct(req, res) {
    const {id, id_prod} = req.params;

    const wasDeleted = await carritoService.deleteProductFromCart(id, id_prod);

    wasDeleted
        ? res.status(200).json({"success": "El producto ya no esta en el carro"})
        : res.status(400).json({"error": "Error"})
}

export async function getProducts(req, res) {
    const {id} = req.params;
    const cartProducts = await carritoService.getAllProductsFromCart(id);

    cartProducts
        ? res.status(200).json(cartProducts)
        : res.status(404).json({"error": "carrito no encontrado"})
}

export async function remove(req, res) {
    const {id} = req.params;
    const wasDeleted = await carritoService.deleteById(id);

    wasDeleted
        ? res.status(200).json({"success": "carrito removido con exito"})
        : res.status(404).json({"error": "carrrito no encontrado"})
}

