import { getProducts as fetchProducts } from "../services/store.service.js";

export const getProducts = async (req, res) => {
  try {
    const products = await fetchProducts(req.query);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
