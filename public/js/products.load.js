// URL to connect to backend JSON API
const API_URL = "http://localhost:8001/api/products";

// Submit button for filtering
const filterButton = document.querySelector("#filter-btn");

filterButton.addEventListener("click", filterProducts);

async function filterProducts() {

  // test
  console.log("Filtering products");

  // Grab filter elemenst
  const filterElements = 
      [document.querySelector("#product-search"), 
      document.querySelector("#category"), 
      document.querySelector("#sort")]

  // Object to hold response
  let products = null;

 const params = new URLSearchParams();
  for (const el of filterElements) {
      if (el.value) {
          params.append(el.name, el.value);
      }
  }

  const newURL = API_URL + "?" + params.toString();

  if (newURL != API_URL + "?") {

    const config = {
        method: "get",
    }

    const response = await fetch(newURL, config);
    products = await response.json();
  }

  if (products) {
    reloadProducts(products);
    return 200;
  } else {
    return 404;
  }

}

function reloadProducts(products) {
  const container = document.getElementById("products-list");

  container.innerHTML = "";

   products.forEach(product => {
    container.innerHTML.insertAdjacentHTML(
        `<div class = "product-card">
          <img src = ${product.image_url} class = "product-image">
          <h3>${product.name}</h3>
          <p>$${product.price}</p>
          <p>${product.category}</p>
          <p>${product.description}</p>

          <a href="/products/${product.id}">
            View Product
          </a>
        </div>
    </div>`
   )})
}