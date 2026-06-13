import { Router } from "express";
import * as apiController from  '../controllers/api.controller.js';

const router = Router();

router.get("/products", apiController.getProducts);

router.get("/cart", bagController.getCart);
router.post("/cart/items", bagController.addItem);
router.delete("/cart/items/:productId", bagController.removeItem);
router.post("/cart/clear", bagController.clearCart);



export default router;