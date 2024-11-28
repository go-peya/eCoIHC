//Variable que mantiene el estado visible del carrito
var carritoVisible = false;

// Lista de productos
var productos = [
    { titulo: "Milhojas 1", img: "img/pan1.png", precio: "S/ 15.00", descripción: "poner texto según producto" },
    { titulo: "Croissant", img: "img/pan2.png", precio: "S/ 25.00", descripción: "poner texto según producto" },
    { titulo: "Milhojas 2", img: "img/pan3.png", precio: "S/ 35.00", descripción: "poner texto según producto" },
    { titulo: "Alfajor", img: "img/pan4.png", precio: "S/ 18.00", descripción: "poner texto según producto" },
    { titulo: "Carrot Cake", img: "img/pan5.png", precio: "S/ 32.00", descripción: "poner texto según producto" },
    { titulo: "Pie 1", img: "img/pan6.png", precio: "S/ 18.00", descripción: "poner texto según producto" },   
    { titulo: "Empanada", img: "img/pan9.png", precio: "S/ 42.80", descripción: "poner texto según producto" },
    { titulo: "Pie 2", img: "img/pan7.png", precio: "S/ 54.00", descripción: "poner texto según producto" }/*,     
    { titulo: "Pie 3", img: "img/pan8.png", precio: "S/ 32.00", descripción: "poner texto según producto" }*/
];

//Espermos que todos los elementos de la pàgina cargen para ejecutar el script
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    renderProductos();
    //Agregremos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }

    // Agregar funcionalidad al botón de cerrar carrito
    var botonCerrarCarrito = document.getElementById('cerrar-carrito');
    botonCerrarCarrito.addEventListener('click', cerrarCarrito);

    //Agrego funcionalidad al boton sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i<botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

     //Agrego funcionalidad al buton restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0;i<botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    //Agregamos funcionalidad al boton Agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    //Agregamos funcionalidad al botón comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}

function cerrarCarrito() {
    if (carritoVisible) {
        var carrito = document.getElementById('carrito');
        carrito.classList.remove('visible');
        carritoVisible = false;
    }
}



function renderProductos() {
    var contenedorItems = document.getElementsByClassName('contenedor-items')[0];
    productos.forEach((producto, index) => {
        var itemHTML = `
            <div class="item">
                <span class="titulo-item">${producto.titulo}</span>
                <img src="${producto.img}" alt="" class="img-item" data-index="${index}">
                <span class="precio-item">${producto.precio}</span>
                <button class="boton-item">Agregar al Carrito</button>
            </div>
        `;
        contenedorItems.innerHTML += itemHTML;
    });

    // Añadir eventos de clic a las imágenes
    document.querySelectorAll('.img-item').forEach(img => {
        img.addEventListener('click', mostrarPopupProducto);
    });
}

function mostrarPopupProducto(event) {
    var index = event.target.getAttribute('data-index');
    var producto = productos[index];

    document.getElementById('popup-img').src = producto.img;
    document.getElementById('popup-title').innerText = producto.titulo;
    document.getElementById('popup-description').innerText = producto.descripción;
    document.getElementById('add-to-cart-popup').setAttribute('data-index', index);

    var popup = document.getElementById('product-popup');
    popup.classList.remove('hidden');
    popup.style.display = 'flex';
}

document.getElementById('font-size-slider').addEventListener('input', function () {
    var newSize = this.value + 'px';
    document.getElementById('popup-description').style.fontSize = newSize;
});

document.getElementById('font-decrease').addEventListener('click', function () {
    var slider = document.getElementById('font-size-slider');
    slider.value = Math.max(parseInt(slider.value) - 1, slider.min);
    slider.dispatchEvent(new Event('input'));
});

document.getElementById('font-increase').addEventListener('click', function () {
    var slider = document.getElementById('font-size-slider');
    slider.value = Math.min(parseInt(slider.value) + 1, slider.max);
    slider.dispatchEvent(new Event('input'));
});

document.getElementById('close-popup').addEventListener('click', cerrarPopup);

function cerrarPopup() {
    var popup = document.getElementById('product-popup');
    popup.classList.add('hidden');
    popup.style.display = 'none';
}



//Eliminamos todos los elementos del carrito y lo ocultamos
function pagarClicked(){
    alert("Gracias por la compra");
    //Elimino todos los elmentos del carrito
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}

//Funciòn que controla el boton clickeado de agregar al carrito
function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);
    //hacerVisibleCarrito();
}

//Funcion que hace visible el carrito
function hacerVisibleCarrito() {
    if (!carritoVisible) {
        var carrito = document.getElementById('carrito');
        carrito.classList.add('visible');
        carritoVisible = true;
    }
}

//Funciòn que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //controlamos que el item que intenta ingresar no se encuentre en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0;i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Agregamos la funcionalidad eliminar al nuevo item
     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Agregmos al funcionalidad restar cantidad del nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

    //Agregamos la funcionalidad sumar cantidad del nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    //Actualizamos total
    actualizarTotalCarrito();
    actualizarContadorCarrito();
}

//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
    actualizarContadorCarrito();
}

//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del carrito
    actualizarTotalCarrito();
    actualizarContadorCarrito();
    //la siguiente funciòn controla si hay elementos en el carrito
    //Si no hay elimino el carrito
    ocultarCarrito();
}

//Funciòn que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.classList.remove('visible');
        carritoVisible = false;
    }
}

//Actualizamos el total de Carrito
function actualizarTotalCarrito(){
    //seleccionamos el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0.00;
    //recorremos cada elemento del carrito para actualizar el total
    for(var i=0; i< carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        //quitamos el simobolo peso y el punto de milesimos.
        var precio = parseFloat(precioElemento.innerText.replace('S/ ','').replace('.',''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        console.log(precio);
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 1)/100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = 'S/ ' + total.toFixed(2);
    document.getElementsByClassName('total-price')[0].innerText = 'S/ ' + total.toFixed(2);
}

document.addEventListener('DOMContentLoaded', () => {
    //const cartBtn = document.getElementById('cart-btn');
    const carrito = document.getElementById('carrito');

    cartBtn.addEventListener('click', () => {
        if (carritoVisible) {
            cerrarCarrito();
        } else {
            hacerVisibleCarrito();
        }
    });
    
});

document.getElementById('cart-btn').addEventListener('click', function() {
    hacerVisibleCarrito();
});

function actualizarContadorCarrito() {
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];
    var cantidadTotal = 0;

    // Sumar las cantidades de cada producto en el carrito
    var inputsCantidad = itemsCarrito.getElementsByClassName('carrito-item-cantidad');
    for (var i = 0; i < inputsCantidad.length; i++) {
        cantidadTotal += parseInt(inputsCantidad[i].value);
    }

    // Actualizar el contador en el span con clase item-count
    var contador = document.querySelector('.item-count');
    contador.innerText = cantidadTotal + (cantidadTotal === 1 ? " item" : " items");
}