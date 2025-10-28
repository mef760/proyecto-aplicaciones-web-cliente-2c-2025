document.addEventListener('DOMContentLoaded', () => {
    // dom elements
    const productsDomElements = document.querySelector('.product-container'); // elemento padre
    const inputSearch = document.getElementById('input-search-products');
    const categoryLinks = document.querySelectorAll('.category-product-filter');

    // airtable config
    const airtableToken = "patP6vJJPzM1RCubl.3bc2423ef373b38205025ecb936ffeba5ac6097dd643edcc702697ece4a26eda";
    const baseId = "appv2Xfi6hr9X1COm";
    const tableName = "Products";
    const airtableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;

    categoryLinks.forEach( link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const category = event.target.innerText.toLowerCase();
            const productsFiltered = filterProducts({   text: '', category: category});
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

    function filterProducts(filters){
        const productsfiltered = listProducts.filter( product => 
            product.name.toLowerCase().includes(filter.text.toLowerCase()) &&
            product.category.toLowerCase().includes(filter.category.toLowerCase())
        );
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
        const productsFiltered = filterProducts({ text: text, category: ''});
        renderProducts(productsFiltered);
    });

/*     async function getProductsFromApi() {
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
*/
    
    async function getProductsFromAirtable() {
        try {
            const response = await fetch(airtableUrl, {
                headers: {
                    'Authorization': `Bearer ${airtableToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log('products from Airtable', data);
            const mappedProducts = data.records.map( item => ({
                name: item.fields.Name,
                price: item.fields.Price,
                img: item.fields.Img,
                category: item.fields.Category
            }));
            listProducts = mappedProducts; // actualizar la lista global de productos
            console.log('mapped products from Airtable', mappedProducts);
            renderProducts(mappedProducts);
        }
        catch (error) {
            console.error('Error fetching products from Airtable:', error);
        }
    }

    getProductsFromAirtable();

    async function editAirtableProduct(product) {
        try {
            const response = await fetch(`${airtableUrl}/rec9OKi8588Sh2Yft`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${airtableToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fields: {
                        Name: product.name, 
                        Price: product.price, 
                        Category: product.category, 
                        Img: product.img
                    }
                })
            });
            const data = await response.json();
            console.log('edited product:', data);
        } catch (error) {
            console.error('Error editing product in Airtable:', error);
        }
    }   

/*     editAirtableProduct({
        name: "Producto editado desde fetch",
        price: 999,
        category: "fragrances",
        img: "https://dummyimage.com/200x200/000/fff"
    }   
    ); */
});

