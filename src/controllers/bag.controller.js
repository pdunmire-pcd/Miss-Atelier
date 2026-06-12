import { getProductById } from "../services/store.service.js";

export const addToBag = async (req, res) => {
    console.log('--- addToBag hit ---');
    console.log('req.body:', req.body);

    const { productId } = req.body;
    const product = await getProductById(productId);

     console.log('product found:', product);

    // guard: if product not found, bail out
    if (!product) {
        console.log('product not found, redirecting');
        return res.redirect('/bag');
    }

    if (!req.session.cart) req.session.cart = [];

     console.log('cart before:', req.session.cart);

    // use product_id and product_name to match your DB columns
    const existing = req.session.cart.find(item => item.id === product.product_id);

    if (existing) {
        existing.quantity += 1;
    } else {
        req.session.cart.push({
            id: product.product_id,
            name: product.product_name,
            category: product.category,
            price: parseFloat(product.price),
            image_url: product.image_path,
            quantity: 1,
        });
    }

    console.log('cart after:', req.session.cart);
    console.log('session id:', req.session.id);
    
    res.redirect('/bag');
};

export const removeFromBag = (req, res) => {
  const id = parseInt(req.params.id);

  if (req.session.cart) {
    req.session.cart = req.session.cart.filter(item => item.id !== id);
  }

  res.redirect('/bag');
};