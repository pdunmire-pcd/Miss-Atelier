import { getProductById } from "../services/store.service.js";

export const addToBag = async (req, res) => {
    const { productId } = req.body;
    const product = await getProductById(productId);

    if (!req.session.cart) req.session.cart = [];
    const existing = req.session.cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        req.session.cart.push({
        id: product.id,
        name: product.name,
        category: product.category,
        price: parseFloat(product.price),
        image_url: product.image_url,
        quantity: 1,
        });
    }

    res.redirect('/bag');
};

export const removeFromBag = (req, res) => {
  const id = parseInt(req.params.id);

  if (req.session.cart) {
    req.session.cart = req.session.cart.filter(item => item.id !== id);
  }

  res.redirect('/bag');
};