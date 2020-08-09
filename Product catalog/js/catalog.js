// Update table of products by id
function updateTable(id, products) {
  const table = document.getElementById(id);
  table.innerHTML = '';

  for (let i = 0; i < products.length; i++) {
    table.innerHTML +=
      `
       <tr>
        <td>${products[i].id}</td>
        <td>${products[i].type}</td>
        <td>${products[i].price}</td>
        <td><button type="button">View</button></td>
       </tr>
      `
  }

  // Add event handler to buttons in table
  table.addEventListener('click', function(e) {
    if (e.target.tagName.toLowerCase() === 'button') {
      processSearchById(Number(e.target.parentNode.parentNode.firstElementChild.innerHTML));
    }
  })
}

// Display product info in Selected product block
function updateProductInfo(product) {
  document.getElementById('productInfo').innerHTML =
    `
      Id: ${product.id} <br>
      Price: ${product.price} <br>
      Type: ${product.type}
    `
}

// Get similar products by price and type
function getSimilar(samePrice, sameType, targetProductId) {
  const similarProducts = [];

  samePrice.forEach(function(obj1) {
    sameType.forEach(function(obj2) {
      if (obj1.id === obj2.id && obj1.id !== targetProductId) {
        similarProducts.push(obj1)
      }
    })
  });

  return similarProducts;
}

// Search process of product by id and set similar products
function processSearchById(id) {
  api.searchProductById(id)
    .then(function(product) {
      return Promise.all([
        api.searchProductsByPrice(product.price, 50),
        api.searchProductsByType(product.type),
        product
      ]);
    })
    .then(function(data) {
      let similar = getSimilar(data[0], data[1], data[2].id);
      updateProductInfo(data[2]);
      updateTable('similarProducts', similar);
    })
    .catch(function(value) {
      console.error(value);
    })
}

// Search process of product by type and set similar products
function processSearchByType(type) {
  api.searchProductsByType(type)
    .then(function(products) {
      updateTable('similarProducts', products)
    })
    .catch(function(value) {
      console.error(value);
    })
}

// Search process of product by price and set similar products
function processSearchByPrice(price) {
  api.searchProductsByPrice(price, 50)
    .then(function(products) {
      updateTable('similarProducts', products)
    })
    .catch(function(value) {
      console.error(value);
    })
}

// Get products catalog from library
api.searchAllProducts().then(function(data) {
  updateTable('products', data)
});

// Add search event to search button by id
document.getElementById('searchIdBtn').addEventListener('click', function() {
  processSearchById(Number(document.getElementById('searchIdInput').value));
});

// Add search event to search button by type
document.getElementById('searchTypeBtn').addEventListener('click', function() {
  processSearchByType(document.getElementById('searchTypeInput').value);
});

// Add search event to search button by price
document.getElementById('searchPriceBtn').addEventListener('click', function() {
  processSearchByPrice(Number(document.getElementById('searchPriceInput').value));
});
