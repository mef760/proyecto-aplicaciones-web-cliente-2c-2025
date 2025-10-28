import { AIRTABLE_TOKEN, BASE_ID, TABLE_NAME } from './env.js';

document.addEventListener('DOMContentLoaded', () => {
  // dom elements
  const productsDomElements = document.querySelector('.product-container');
  const inputSearch = document.getElementById('input-search-products');
  const categoryLinks = document.querySelectorAll('.category-product-filter');

  // airtable config
  const airtableToken = AIRTABLE_TOKEN;
  const baseId = BASE_ID;
  const tableName = TABLE_NAME;
  const airtableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;

  // estado global
  let listProducts = [];
  const currentFilters = { text: '', category: '' };

  // eventos
  inputSearch.addEventListener('keyup', (event) => {
    currentFilters.text = event.target.value.toLowerCase();
    renderProducts(filterProducts());
  });

  categoryLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const category = event.target.innerText.toLowerCase();
      currentFilters.category = (currentFilters.category === category) ? '' : category;
      renderProducts(filterProducts());
    });
  });

  // funciones
  function createProduct(product) {
    const newProduct = document.createElement('div');
    newProduct.className = "product-item";

    const newAnchor = document.createElement('a');
    newAnchor.href = "./product-detail.html";

    const newDiv = document.createElement('div');
    newDiv.className = "fondo-rojo";

    const newImg = document.createElement('img');
    newImg.src = product.img;
    newImg.alt = product.name;
    newImg.width = 100;

    const newPName = document.createElement('p');
    newPName.className = "product-name";
    newPName.innerText = product.name;

    const newPPrice = document.createElement('p');
    newPPrice.className = "product-price";
    newPPrice.innerText = `Precio: $${product.price}.00`;

    const buttonAddToCart = document.createElement('button');
    buttonAddToCart.innerText = "Agregar al carrito";
    buttonAddToCart.addEventListener('click', (e) => {
      e.preventDefault();
      console.log(`Agregando al carrito: ${product.name}`);
    });

    newDiv.append(newImg, newPName, newPPrice, buttonAddToCart);
    newAnchor.appendChild(newDiv);
    newProduct.appendChild(newAnchor);
    return newProduct;
  }

  function filterProducts() {
    return listProducts.filter(product =>
      product.name.toLowerCase().includes(currentFilters.text) &&
      (currentFilters.category === '' || product.category.toLowerCase() === currentFilters.category)
    );
  }

  function renderProducts(products) {
    productsDomElements.innerHTML = '';
    products.forEach(product => {
      productsDomElements.appendChild(createProduct(product));
    });
  }

  // obtener productos de Airtable
  async function getProductsFromAirtable() {
    try {
      const response = await fetch(airtableUrl, {
        headers: {
          'Authorization': `Bearer ${airtableToken}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      listProducts = data.records.map(item => ({
        name: item.fields.Name,
        price: item.fields.Price,
        img: item.fields.Img,
        category: item.fields.Category
      }));
      renderProducts(listProducts);
    } catch (error) {
      console.error('Error fetching products from Airtable:', error);
    }
  }

  getProductsFromAirtable();
});
