import { getProducts, getProductById } from "../services/store.service.js";

export async function getStorePage(req, res) {
  const FEATURED_PRODUCT_ID = 15; // Linen-Cotton Openwork Top

  const product = await getProductById(FEATURED_PRODUCT_ID);

  res.render("store", {
    title: "Miss Atelier",
    heroLine1: "Miss Atelier",
    heroLine2: "Handmade Essentials",
    hero: {
      image: "/images/hero-cardigan.jpg",
      imageAlt: "Miss Atelier clothing",
      subtitle: "Soft pieces made with care",
    },
    tiles: {
      patterns: {
        image: "/images/patterns-book.jpg",
        imageAlt: "Patterns",
      },
      yarn: {
        image: "/images/yarn-skeins.jpg",
        imageAlt: "Yarn",
      },
    },
    storeDescription: {
      image: "/images/store-description.jpg",
      imageAlt: "Miss Atelier boutique interior",
      heading: "Handmade Style for Soft, Everyday Elegance",
      text: "Miss Atelier offers elegant ready-to-wear pieces, crochet patterns, yarn, and sewing notions for people who love timeless handmade fashion.",
    },
    featuredProduct: {
      id: product.id,
      image: product.image_path,
      imageAlt: product.product_name,
      name: product.product_name,
      description: product.description,
      price: `$${Number(product.price).toFixed(2)}`,
    },
  });
}

export const getProductsPage = async (req, res) => {
  try {
    const products = await getProducts(req.query);

    res.render("products", {
      title: "Products",
      products,
      category: req.query.category || "",
    });
  } catch (err) {
    console.error("Error loading products page:", err);
    res.status(500).send("Error loading products");
  }
};

export const getProductDetailPage = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    return res.render("product-detail", {
      title: product.product_name,
      product,
    });
  } catch (err) {
    console.error("Error loading product detail page:", err);
    return res.status(500).send("Error loading product detail");
  }
};

// GET /bag (SSR page shell — content is populated client-side via /api/cart)
export const getBagPage = (req, res) => res.render("bag", { title: "Shopping Bag" });

export const getAboutPage = (req, res) => {
  res.render("about", {
    title: "About Miss Atelier",
  });
};
