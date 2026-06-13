import { getProductById } from "../services/store.service.js";

// GET /bag (SSR page shell — content is populated client-side via /api/cart)
export const getBagPage = (req, res) => {
    return res.render("bag", { title: "Shopping Bag" });
};