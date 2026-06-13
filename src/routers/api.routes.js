import { Router } from "express";
import * as apiController from  '../controllers/api.controller.js';

const router = Router();

router.get("/products", apiController.getProducts);

router.get("/cart", apiController.getCart);
router.post("/cart/items", apiController.addItem);
router.delete("/cart/items/:productId", apiController.removeItem);
router.post("/cart/clear", apiController.clearCart);



export default router;