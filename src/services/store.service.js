import { products } from "../model/products.temp.js";

export const getAllProducts = () => {
  return products;
}

export const sortProducts = (sort, products) => {
  if (sort.contains("name")) {
    if (sort.startsWith("+")){
      return products.sort((a, b) => a.name.localeCompare(b));
    } else {
      return products.sort((a, b) => b.name.localeCompare(a));
    }
  } else if (sort.contains("price")) {
    if (sort.startsWith("+")){
      return products.sort((a, b) => a.price - b.price);
    } else {
      return products.sort((a, b) => b.price - a.price);
    }
  } else if (sort.contains("category")) {
    if (sort.startsWith("+")){
       return products.sort((a, b) => a.category.localeCompare(b));
    } else {
      return products.sort((a, b) => b.category.localeCompare(a));
    }
  }

  return products;
}