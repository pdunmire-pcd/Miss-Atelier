import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.render("default", {
        title: "Miss Atelier | Editorial Luxury Knit Studio",
        tagline: "The Art of Slowness",
        heroTitle: "An Editorial Luxury Knit Studio",
        heroDescription: "Miss Atelier celebrates the poetry of texture and the beauty of deliberate craft. We offer a curated ecosystem for the modern connoisseur: ready-to-wear garments handcrafted in limited runs by studio artisans, meticulously graded designer PDF knitting patterns, and sustainably sourced luxury fibers from small-batch mills and independent dyers.",
        featuredSectionTitle: "The Seasonal Feature",
        featuredProduct: {
            label: "Ready To Wear — Limited Run",
            name: "The Atelier Editorial Cape",
            price: "$540.00",
            description: "Crafted from a decadent, bespoke blend of premium merino, long-staple cashmere, and Mulberry silk. Featuring an elegant structural drape, a masterfully engineered collar silhouette, and finished with hand-polished taupe-gold hardware. Each piece is meticulously made-to-order by a single studio artisan to ensure absolute perfection. Customizable sizing and seasonal colorways are available upon request.",
            image: "/images/default.webp",
            imageAlt: "Miss Atelier — The Atelier Editorial Cape"
        }
    });
});

export default router;
