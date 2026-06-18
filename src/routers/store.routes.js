import { Router } from "express";
import * as storeController from  '../controllers/store.controller.js';
import * as authcontroller from '../controllers/auth.controller.js';
import requireAuth from '../middleware/requireAuth.js';

const router = Router();

router.get("/", storeController.getStorePage);

// Existing users login 
router.get("/login", authcontroller.getLogin);
router.post('/login', authcontroller.postLogin);

// Logout
router.post('/logout', authcontroller.logout);

// Create a new account
router.get("/register", authcontroller.getRegister);
router.post('/register', authcontroller.postRegister);

// Account page
router.get("/account", authcontroller.getAccount);

// About page
router.get("/about", storeController.getAboutPage);

// Accessing Products (protected — login required)
router.get("/products", requireAuth, storeController.getProductsPage);
router.get("/products/:id", requireAuth, storeController.getProductDetailPage);

router.get("/search", (req, res) => {
    res.render("search", { title: "Search" });
});

// Accessing cart
router.get("/bag", storeController.getBagPage);

router.get("/contact", (req, res) => {
    res.render("contact", { title: "Contact Us" });
});

export default router;