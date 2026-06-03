import * as repo from "../model/default.repo.js";

export async function getProducts(filters) {
    return await repo.getAllProducts(filters);
}

export async function getProductById(id) {
    return await repo.getProductById(id);
}