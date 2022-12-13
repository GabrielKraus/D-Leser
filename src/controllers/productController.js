import {ProductoService} from "../services/productoService.js";

const productoService = ProductoService.getInstance();

export async function getAll(req, res) {
    const products = await productoService.getAll();
    products
        ? res.status(200).json(products)
        : res.status(400).json({"error": "no se pudo traer los productos"})
}



export async function create(req, res) {
    const {body} = req;
    const newProduct = await productoService.create(body);

    newProduct
        ? res.status(200).json({"success": "Producto agregado con la id " + newProduct._id})
        : res.status(400).json({"error": "Error"})
}

export async function update(req, res) {
    const {id} = req.params;
    const {body} = req;
    const wasUpdated = await productoService.updateProductById(id, body);

    wasUpdated
        ? res.status(200).json({"success": "producto actualizado"})
        : res.status(404).json({"error": "producto no encontrado."})
}

export async function remove(req, res) {
    const {id} = req.params;
    const wasDeleted = await productoService.deleteById(id)

    wasDeleted
        ? res.status(200).json({"success": "producto removido"})
        : res.status(404).json({"error": "producto no encontrado"})
}

export async function getById(req, res) {
    const {id} = req.params;
    const product = await productoService.getProductById(id);

    product
        ? res.status(200).json(product)
        : res.status(400).json({"error": "producto no encontrado"})
}
