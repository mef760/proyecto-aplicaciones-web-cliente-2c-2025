document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelector('.product-container'); // elemento padre

    // cre los elementos
    const newProduct = document.createElement('div'); 
    newProduct.setAttribute("class","product-item");
    /*newProduct.innerHTML = `
        <a href="./product-detail.html">
            <div class="fondo-rojo">
                <img src="./img/monitor.jpg" alt="Producto Nuevo" width="100px">
                <p>Producto Nuevo</p>
                <p>Precio: $100.00</p>
            </div>
        </a>
    `;
    */

    const newAnchor = document.createElement('a');
    newAnchor.setAttribute("href","./product-detail.html");

    const newDiv = document.createElement('div');
    newDiv.setAttribute("class","fondo-rojo");

    const newImg = document.createElement('img');
    newImg.setAttribute("src","./img/monitor.jpg");
    newImg.setAttribute("alt","Producto Nuevo");
    newImg.setAttribute("width","100px");

    newDiv.appendChild(newImg);
    newAnchor.appendChild(newDiv);
    newProduct.appendChild(newAnchor);

    const texto = "Nuevo Producto";
    const texto2 = 'Nuevo Producto' + ' ' + texto;
    const texto3 = `Nuevo Producto.  ${texto}`;

    console.log("texto con comillas", texto2);
    console.log("texto con backticks", texto3);

    // agrego el contenido nuevo al DOM
    products.appendChild(newProduct);

    const buttons = document.querySelectorAll('button');
    console.log(buttons);

    buttons.forEach((button) => {
        button.addEventListener('click', ()=> {
            alert('Hiciste click en el boton');
        })
    });

});

