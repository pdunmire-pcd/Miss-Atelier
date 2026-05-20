import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.render("default", {
        title: "Miss Atelier | Editorial Luxury Knit Studio",
        heroLine1: "Essential Knitwear.",
        heroLine2: "Crafted For Life.",
        hero: {
            image: "/images/hero-cardigan.jpg",
            imageAlt: "Miss Atelier — The Atelier Cardigan, ready to wear",
            subtitle: "Limited runs. Sourced sustainably. Made to order."
        },
        tiles: {
            patterns: {
                image: "/images/patterns-book.jpg",
                imageAlt: "Knitting pattern book — The Atelier Cable Sweater"
            },
            yarn: {
                image: "/images/yarn-skeins.jpg",
                imageAlt: "Luxury yarn skeins sourced by Miss Atelier"
            }
        }
    });
});

export default router;
