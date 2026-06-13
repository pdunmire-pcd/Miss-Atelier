import { getProducts as fetchProducts } from "../services/store.service.js";

export const getProducts = async (req, res) => {
  try {
    const products = await fetchProducts(req.query);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/cart
export const getCart = (req, res) => {
    const cart = req.session.cart || [];
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return res.status(200).json({ cart, subtotal });
};

// POST /api/cart/items
export const addItem = async (req, res) => {
    const { productId } = req.body;

    if (!productId) {
        return res.status(400).json({ error: "productId is required" });
    }

    const product = await getProductById(productId);

    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    if (!req.session.cart) req.session.cart = [];

    const existing = req.session.cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        req.session.cart.push({
            id: product.id,
            name: product.product_name,
            category: product.category,
            price: parseFloat(product.price),
            image_url: product.image_path,
            quantity: 1,
        });
    }

    return res.status(200).json({ message: "Item added", cart: req.session.cart });
};

// DELETE /api/cart/items/:productId
export const removeItem = (req, res) => {
    const id = parseInt(req.params.productId);

    if (!req.session.cart) {
        return res.status(400).json({ error: "Cart is empty" });
    }

    req.session.cart = req.session.cart.filter(item => item.id !== id);

    return res.status(200).json({ message: "Item removed", cart: req.session.cart });
};

// POST /api/cart/clear
export const clearCart = (req, res) => {
    req.session.cart = [];
    return res.status(200).json({ message: "Cart cleared" });
};

