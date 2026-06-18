import { Router } from "express";
import * as apiController from  '../controllers/api.controller.js';
import requireAuth from '../middleware/requireAuth.js';
import {
    getProducts,
    getCart,
    addItem,
    removeItem,
    clearCart,
    updateQuantity
} from "../controllers/api.controller.js";

const router = Router();

// All /api/* endpoints are protected — unauthenticated requests get 401 JSON.
router.use(requireAuth);

router.get("/products", apiController.getProducts);

router.get("/cart", apiController.getCart);
router.post("/cart/items", apiController.addItem);
router.delete("/cart/items/:productId", apiController.removeItem);
router.post("/cart/clear", apiController.clearCart);
router.patch("/cart/items/:productId", updateQuantity);



export default router;