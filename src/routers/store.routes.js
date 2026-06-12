import { Router } from "express";
import * as storeController from  '../controllers/store.controller.js';
import * as authcontroller from '../controllers/auth.controller.js';

const router = Router();

router.get("/", storeController.getStorePage);

// Existing users login 
router.get("/login", authcontroller.getLogin);

router.get("/products", storeController.getProductsPage);
router.get("/products/:id", storeController.getProductDetailPage);

// Create a new account
router.get("/register", authcontroller.getRegister);

router.get("/about", storeController.getAboutPage);

router.get("/search", (req, res) => {
    res.render("search", { title: "Search" });
});

// Users account dashboard page
router.get("/account", (req, res) => {
    res.render("account", { title: "Account" });
});

router.get("/bag", (req, res) => {
    res.render("bag", { title: "Shopping Bag" });
});

router.get("/contact", (req, res) => {
    res.render("contact", { title: "Contact Us" });
});

router.post('/register', authcontroller.postRegister);
router.post('/login', authcontroller.postLogin);
router.post('/logout', authcontroller.logout);

export default router;