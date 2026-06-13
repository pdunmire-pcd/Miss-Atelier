const API_URL = "/api/products";

// Grab search button and search input
const filterButton = document.querySelector("#filter-btn");
const productSearch = document.querySelector("#product-search");

// Add click event listener + enter event listener for search input
filterButton.addEventListener("click", filterProducts);
productSearch.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    filterButton.click();
  }
});

// Applies sort, filter, and search API calls
async function filterProducts() {

    // Grab each input
    const category = document.querySelector("#category").value;
    const sort = document.querySelector("#sort").value;
    const search = document.querySelector("#product-search").value;

    // Add params to url
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (sort) params.append("sort", sort);
    if (search) params.append("search", search);

    const url = params.toString() ? `${API_URL}?${params.toString()}` : API_URL;

    // API call + error handling
    try {
        const response = await fetch(url);
        const products = await response.json();
        reloadProducts(products);
    } catch (err) {
        console.error("Error fetching products:", err);
    }
}

// Reload page with new products
function reloadProducts(products) {

    // Grab products
    const container = document.getElementById("product-list");

    container.style.display = "grid";

    // Clear inner HTML
    container.innerHTML = "";

    // Replace with new products
    products.forEach(product => {
        container.insertAdjacentHTML("beforeend",
            `<div class="product-card">
                <img src="${product.image_path}" class="product-image" alt="${product.product_name}">
                <h3>${product.product_name}</h3>
                <p>$${product.price}</p>
                <p>${product.category}</p>
                <p>${product.description}</p>
                <a href="/products/${product.id}">View Product</a>
                <button class="btn-add-cart" data-product-id="${product.id}">Add to Cart</button>
            </div>`
        );
    });

    if (container.innerHTML == "") {
      container.insertAdjacentHTML("beforeend", 
        `<div id="no-items">No items found. Search again?</div>`
      )

      container.style.display = "block";
    };

     wireAddToCartButtons();
}
