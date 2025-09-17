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


    const objeto = { 
        nombre: "Monitor", 
        precio: 300,
        devolverNombre: function() {
            console.log(this.precio);
        }
    }

    objeto.devolverNombre();


    const arreglo = [1,2,3,4,5];
    const nuevoArreglo = [];
    arreglo.forEach( (numero) => {
        nuevoArreglo.push(numero + 5);
    } );

    console.log("nuevo arreglo usando foreach: ", nuevoArreglo);

    const nuevoArregloMap = arreglo.map( (numero) => numero + 5 );

    console.log("nuevo arreglo usando map: ", nuevoArregloMap);

    const arregloFiltrado = arreglo.filter( (numero) => numero > 3 );

    console.log("arreglo filtrado: ", arregloFiltrado);

    const alumnos = [
        { nombre: "Juan", edad: 25, dni: "12345678"},
        { nombre: "Ana", edad: 20, dni: "42345578" },
        { nombre: "Carlos", edad: 30, dni: "32345678" },
        { nombre: "Maria", edad: 22, dni: "35434343" }
    ];

    const elemento = alumnos.find( (alumno) => alumno.dni === "32345678" );

    console.log("elemento encontrado: ", elemento);

    const totalEdades = alumnos.reduce( (total, alumno) => total + alumno.edad, 0 );

    console.log("total edades: ", totalEdades);  
});

