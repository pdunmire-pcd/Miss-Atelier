import { Router } from "express";
import * as apiController from  '../controllers/api.controller.js';

const router = Router();

router.get("/products", apiController.getProducts);

export default router;