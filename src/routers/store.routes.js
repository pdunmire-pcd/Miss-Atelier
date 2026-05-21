import { Router } from "express";
import * as storeController from  '../controllers/shop.controller';

const router = Router();

router.get("/", (req, res) => {
    res.render("store");
});

router.get("/login", (req, res) => {
    res.render();
});

router.get("/products", (req, res) => {
    res.render();
});


export default router;