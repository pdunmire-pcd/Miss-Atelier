import { Router } from "express";
import * as storeController from  '../controllers/shop.controller';

const router = Router();

router.get("/", (req, res) => {
    res.render("default", {
        title: "Miss Atelier",
        subtitle: "Express + EJS + Static Assets"
    });
});

export default router;