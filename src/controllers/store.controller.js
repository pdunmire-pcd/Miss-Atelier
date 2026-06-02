import { getAllProducts } from "../services/store.service.js";

export function getStorePage(req, res) {
    res.render("store", {
        //sending data into ejs
        title: "Miss Atelier",
        heroLine1: "Miss Atelier",
        heroLine2: "Handmade Essentials",
        //nested objects
        hero: {
            image: "/images/hero-cardigan.jpg",
            imageAlt: "Miss Atelier clothing",
            subtitle: "Soft pieces made with care"
        },
        tiles: {
            patterns: {
                image: "/images/patterns-book.jpg",
                imageAlt: "Patterns"
            },
            yarn: {
                image: "/images/yarn-skeins.jpg",
                imageAlt: "Yarn"
            }
        },

        storeDescription: {
        image: "/images/store-description.jpg",
        imageAlt: "Miss Atelier boutique interior",
        heading: "Handmade Style for Soft, Everyday Elegance",
        text: "Miss Atelier offers elegant ready-to-wear pieces, crochet patterns, yarn, and sewing notions for people who love timeless handmade fashion."
        },
        
        featuredProduct: {
        image: "/images/featured-product.jpg",
        imageAlt: "Placeholder product image",
        name: "Ivory Crochet Cardigan",
        description: "A soft cream cardigan designed for layering and adding a handcrafted touch to everyday outfits.",
        price: "$48.00"
        }
    });
};

export const getProducts = async (req, res) => {
    const products = await getAllProducts();
    if (products) {
        res.render("products", { title: "Products", products: products });
    } else {
        res.status(500).send("Error fetching products");
    }
};