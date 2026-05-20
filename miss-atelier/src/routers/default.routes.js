import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.render("default", {
        title: "Miss Atelier | Editorial Luxury Knit Studio",
        heroLine1: "Essential Knitwear.",
        heroLine2: "Crafted For Life.",
        hero: {
            image: "/images/default.webp",
            imageAlt: "Miss Atelier — Ready To Wear",
            subtitle: "Limited runs. Sourced sustainably.\nMade to order."
        },
        tiles: {
            patterns: {
                image: "/images/default.webp",
                imageAlt: "Knitting patterns — download and create"
            },
            yarn: {
                image: "/images/default.webp",
                imageAlt: "Luxury yarn and notions"
            }
        }
    });
});

export default router;
