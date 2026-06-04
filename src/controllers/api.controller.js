import { sortProducts, getAllProducts} from "../services/store.service.js";

export const getProducts = async (req, res) => {
    let products = await getAllProducts();

    if (req.query.category) {
      const category = req.query.category;
      products = products.filter((p) => p.category === category);
    }

    if (req.query.sort) {
      const sort = req.query.sort;
      products = sortProducts(sort, products);
    }

    if (products) {
        res.status(200).json(products);
    } else {
        res.status(500).send("Error fetching products");
    }
    
};