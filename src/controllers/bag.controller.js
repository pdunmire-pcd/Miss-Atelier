import { getProductById } from "../services/store.service.js";

// SSR shim: POST /bag/add (form submit from product-detail.ejs)
export const addItemSSR = async (req, res) => {
    const { productId } = req.body;
    const product = await getProductById(productId);

    if (!product) return res.redirect('/bag');

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

    return res.redirect('/bag');
};

// SSR shim: POST /bag/remove/:id (form submit from bag.ejs)
export const removeItemSSR = (req, res) => {
    const id = parseInt(req.params.id);

    if (req.session.cart) {
        req.session.cart = req.session.cart.filter(item => item.id !== id);
    }

    return res.redirect('/bag');
};

// GET /bag (SSR page)
export const getBagPage = (req, res) => {
    const cart = req.session.cart || [];
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return res.render("bag", { title: "Shopping Bag", cartItems: cart, subtotal });
};