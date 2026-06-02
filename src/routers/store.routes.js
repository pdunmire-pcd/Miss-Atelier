import { Router } from "express";
import * as storeController from  '../controllers/store.controller.js';

const router = Router();

router.get("/", storeController.getStorePage);

// Existing users login 
router.get("/login", (req, res) => {
    res.render("login", { title: "Login" });
});

router.get("/products", storeController.getProducts);

// Create a new account
router.get("/register", (req, res) => {
    res.render("register", { title: "Create Account" });
});

router.get("/about", (req, res) => {
    res.render("about", { title: "About Us" });
});

router.get("/journal", (req, res) => {
    res.render("journal", { title: "Journal" });
});

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


export default router;