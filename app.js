document.addEventListener('DOMContentLoaded', () => {
    // dom elements
    const productsDomElements = document.querySelector('.product-container'); // elemento padre
    const inputSearch = document.getElementById('input-search-products');
    const categoryLinks = document.querySelectorAll('.category-product-filter');

    categoryLinks.forEach( link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const category = event.target.innerText.toLowerCase();
            const productsFiltered = filterProductsByCategory(category);
            renderProducts(productsFiltered);
        })
    });

    // funciones
    function createProduct(product){
        const newProduct = document.createElement('div'); 
        newProduct.setAttribute("class","product-item");

        const newAnchor = document.createElement('a');
        newAnchor.setAttribute("href","./product-detail.html");

        const newDiv = document.createElement('div');
        newDiv.setAttribute("class","fondo-rojo");

        const newImg = document.createElement('img');
        newImg.setAttribute("src", product.img);
        newImg.setAttribute("alt", product.name);
        newImg.setAttribute("width","100px");

        const newPName = document.createElement('p');
        newPName.setAttribute("class","product-name");
        newPName.innerText = product.name;

        const newPPrice = document.createElement('p');
        newPPrice.setAttribute("class","product-price");
        newPPrice.innerText = `Precio: $${product.price}.00`;

        const buttonAddToCart = document.createElement('button');
        buttonAddToCart.innerText = "Agregar al carrito";
        buttonAddToCart.addEventListener('click', (event) => {
            event.preventDefault(); // para que no navegue al detalle del producto
            console.log(`agregando al carrito: ${product.name}`);
        });

        // estructura

        newDiv.appendChild(newImg);
        newDiv.appendChild(newPPrice);
        newDiv.appendChild(newPName);
        newDiv.appendChild(buttonAddToCart);
        newAnchor.appendChild(newDiv);
        newProduct.appendChild(newAnchor);

        return newProduct;
    }

    function filterProducts(text){
        const productsfiltered = listProducts.filter( product => product.name.toLowerCase().includes(text.toLowerCase()));
        return productsfiltered;
    }

    function filterProductsByCategory(category){
        const productsfiltered = listProducts.filter( product => product.category === category);
        return productsfiltered;
    }

    function renderProducts(products){
        productsDomElements.innerHTML = '';
        products.forEach(product => {
            const newProduct = createProduct(product);
            productsDomElements.appendChild(newProduct);
        });
    }

    // events
    inputSearch.addEventListener('keyup', (event) => {
        const text = event.target.value;
        const productsFiltered = filterProducts(text);
        renderProducts(productsFiltered);
    });

    async function getProductsFromApi() {
        try {
            const response = await fetch('https://dummyjson.com/products/category/fragrances');
            const data = await response.json();
            console.log('products from API', data);
            // imprimir productos
            const mappedProducts = data.products.map( product => ({
                name: product.title,
                price: product.price,
                img: product.images[0],
                category: product.category
            }));
            console.log('mapped products', mappedProducts);
            // imprimir productos
            renderProducts(mappedProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    getProductsFromApi();

});

