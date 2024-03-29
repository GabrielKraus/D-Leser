import express from "express";
import auth from "../middlewares/auth.js";
import * as productController from '../controllers/productController.js'

const router = express.Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getById);

router.post('/', auth, productController.create);

router.put('/:id', productController.update);

router.delete('/:id', auth, productController.remove);

export default router;
