import { Router } from "express";
import * as storeController from  '../controllers/shop.controller.js';

const router = Router();

router.get("/", storeController.getStorePage);

router.get("/login", (req, res) => {
    res.render();
});

router.get("/products", (req, res) => {
    res.render();
});


export default router;