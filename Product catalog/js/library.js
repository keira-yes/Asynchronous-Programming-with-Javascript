(function(window) {

  function myLibrary() {

    let catalog = createRandomCatalog(100);

    // Create product with random price and type
    function createRandomProduct() {
      const types = ['Food', 'Clothing', 'Books', 'Electronics'];
      let price = (Math.random()*500 + 1).toFixed(2);
      let type = types[Math.floor(Math.random()*4)];

      return {price, type};
    }

    // Create catalog with random products
    function createRandomCatalog(number) {
      const catalog = [];
      for (let i = 0; i < number; i++) {
        let product = createRandomProduct();
        catalog.push({
          id: i,
          price: product.price,
          type: product.type
        })
      }
      return catalog;
    }

    // Function returns catalog after 1 sec
    function searchAllProducts() {
      return new Promise(function(resolve) {
        setTimeout(function() {
          resolve(catalog)
        }, 1000)
      });
    }

    // Search product in catalog by id
    function searchProductById(id) {
      return new Promise(function(resolve, reject) {
        let i = 0;

        setTimeout(function() {
          while (i < catalog.length) {
            if (catalog[i].id === id) {
              resolve({
                id,
                price: catalog[i].price,
                type: catalog[i].type
              })
            }
            i++;
          }
          reject('Invalid ID: ' + id);
        }, 1000)
      })
    }

    // Search products by type
    function searchProductsByType(type) {
      return new Promise(function(resolve, reject) {
        let i = 0;
        const types = ['Food', 'Clothing', 'Books', 'Electronics'];
        const typeArray = [];

        if (types.includes(type)) {
          setTimeout(function() {
            while (i < catalog.length) {
              if (catalog[i].type === type) {
                typeArray.push({
                  id: catalog[i].id,
                  price: catalog[i].price,
                  type: catalog[i].type
                })
              }
              i++;
            }
            resolve(typeArray);
          }, 1000)
        } else {
          reject('Invalid type: ' + type)
        }
      })
    }

    // Search products by price
    function searchProductsByPrice(price, difference) {
      return new Promise(function (resolve, reject) {
        let i = 0;
        const priceArray = [];

        if(isFinite(price)) {
          setTimeout(function () {
            while (i < catalog.length) {
              if (Math.abs(catalog[i].price - price) < difference) {
                priceArray.push({
                  id: catalog[i].id,
                  price: catalog[i].price,
                  type: catalog[i].type
                })
              }
              i++;
            }
            resolve(priceArray);
          }, 1000)
        } else {
          reject('Invalid price: ' + price)
        }
      })
    }

    return {
      searchProductById: searchProductById,
      searchProductsByPrice: searchProductsByPrice,
      searchProductsByType: searchProductsByType,
      searchAllProducts: searchAllProducts
    }
  }

  if (typeof(window.api) === "undefined") {
    window.api = myLibrary();
  }

})(window);