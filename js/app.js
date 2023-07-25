let productosCarrito = [];
let total = 0; 
const listaProductos = document.querySelector('#lista-productos');
const autoCarrito = document.querySelector('#carrito');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');

listaProductos.addEventListener('click', agregarAuto);
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
autoCarrito.addEventListener('click', eliminarProducto);


document.addEventListener('DOMContentLoaded', () => {
  productosCarrito = obtenerProductosLocalStorage();
  calcularTotal(); 
  carritoHTML();
});


function agregarAuto(evt) {
  evt.preventDefault();
  if (evt.target.classList.contains('reservar-ahora')) {
    const producto = evt.target.parentElement.parentElement;
    leerDatosProducto(producto);
  }
}

function mostrarMensaje(mensaje) {
  const mensajeCarrito = document.querySelector('#mensaje-carrito');
  mensajeCarrito.innerHTML = `
    <p>${mensaje}</p>
    <button id="cerrar-mensaje">Cerrar</button>
  `;

  
  const cerrarMensajeBtn = document.querySelector('#cerrar-mensaje');
  cerrarMensajeBtn.addEventListener('click', () => {
    mensajeCarrito.innerHTML = ''; 
  });
}

function leerDatosProducto(item) {
  const productoId = item.querySelector('.reservar-ahora').getAttribute('data-id');
  const productoExistente = productosCarrito.find(producto => producto.id === productoId);

  if (!productoExistente) {
    const precioTexto = item.querySelector('.looking_text').textContent;
    const precio = parseFloat(precioTexto.replace('$', ''));
    const infoProducto = {
      imagen: item.querySelector('.gallery_img img').src,
      titulo: item.querySelector('.types_text').textContent,
      precio: precio,
      id: productoId,
      cantidad: 1
    };
    productosCarrito.push(infoProducto);
    mostrarMensaje("Producto agregado al carrito.");
    guardarProductosLocalStorage();
    calcularTotal(); 
    carritoHTML();
  } else {
    mostrarMensaje("Este producto ya está en el carrito.");
  }
}


function calcularTotal() {
  total = productosCarrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0);
  const totalElement = document.querySelector('.total');
  totalElement.textContent = `Total: $${total.toFixed(2)}`;
}


function obtenerProductosLocalStorage() {
  const productosJSON = localStorage.getItem('productosCarrito');
  return productosJSON ? JSON.parse(productosJSON) : [];
}


function guardarProductosLocalStorage() {
  const productosJSON = JSON.stringify(productosCarrito);
  localStorage.setItem('productosCarrito', productosJSON);
}

function eliminarProducto(evt) {
  evt.preventDefault();
  if (evt.target.classList.contains('borrar-producto')) {
    const producto = evt.target.parentElement.parentElement;
    const productoId = producto.querySelector('a').getAttribute('data-id');
    productosCarrito = productosCarrito.filter(producto => producto.id !== productoId);
    carritoHTML();
    calcularTotal();
    guardarProductosLocalStorage(); 
  }
}

function carritoHTML() {
  vaciarCarrito();
  productosCarrito.forEach(producto => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>
        <img src="${producto.imagen}" width="100" />
      </td>
      <td>${producto.titulo}</td>
      <td>${producto.precio}</td>
      <td>
        <a href="#" class="borrar-producto" data-id="${producto.id}">🗑</a>
      </td>
    `;
    contenedorCarrito.appendChild(fila);
  });

  calcularTotal();
}


function vaciarCarrito() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
  calcularTotal(); 
}

carritoHTML();
