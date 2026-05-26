import { Router } from "express";
import * as storeController from  '../controllers/shop.controller.js';

const router = Router();

router.get("/", storeController.getStorePage);

// Existing users login 
router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/products", (req, res) => {
    res.render("products");
});

// Create a new account
router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/about", (req, res) => {
    res.render("about");
});

router.get("/journal", (req, res) => {
    res.render("journal");
});

router.get("/search", (req, res) => {
    res.render("search");
});

// Users account dashboard page
router.get("/account", (req, res) => {
    res.render("account");
});

router.get("/bag", (req, res) => {
    res.render("bag");
});

router.get("/contact", (req, res) => {
    res.render("contact");
});


export default router;