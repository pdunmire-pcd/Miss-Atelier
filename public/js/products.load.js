const API_URL = "/api/products";

const filterButton = document.querySelector("#filter-btn");
filterButton.addEventListener("click", filterProducts);

async function filterProducts() {
    const category = document.querySelector("#category").value;
    const sort = document.querySelector("#sort").value;

    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (sort) params.append("sort", sort);

    const url = params.toString() ? `${API_URL}?${params.toString()}` : API_URL;

    try {
        const response = await fetch(url);
        const products = await response.json();
        reloadProducts(products);
    } catch (err) {
        console.error("Error fetching products:", err);
    }
}

function reloadProducts(products) {
    const container = document.getElementById("product-list");
    container.innerHTML = "";

    products.forEach(product => {
        container.insertAdjacentHTML("beforeend",
            `<div class="product-card">
                <img src="${product.image_path}" class="product-image" alt="${product.product_name}">
                <h3>${product.product_name}</h3>
                <p>$${product.price}</p>
                <p>${product.category}</p>
                <p>${product.description}</p>
                <a href="/products/${product.id}">View Product</a>
            </div>`
        );
    });
}
