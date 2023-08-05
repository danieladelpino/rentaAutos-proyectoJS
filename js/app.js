let productosCarrito = [];
let total = 0;
const listaProductos = document.querySelector('#lista-productos');
const autoCarrito = document.querySelector('#carrito');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const sendButton = document.querySelector(".send_bt a");
const suscribeButton = document.querySelector(".subscribe_bt a");

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
    guardarProductosLocalStorage();
    Swal.fire('Artículo agregado al carrito');
    calcularTotal();
    carritoHTML();
  } else {
    Swal.fire('Artículo ya está agregado al carrito');
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

document.addEventListener('DOMContentLoaded', () => {
  const filtroForm = document.querySelector('#filtroForm');
  filtroForm.addEventListener('submit', filtrarAutos);
  mostrarAutos(autosDisponibles);
});

function filtrarAutos(evt) {
  evt.preventDefault();

  const marcaSeleccionada = document.querySelector('#marca').value;
  const modeloSeleccionado = document.querySelector('#modelo').value;
  const precioSeleccionado = document.querySelector('#precio').value;

  const autosFiltrados = obtenerAutosFiltrados(marcaSeleccionada, modeloSeleccionado, precioSeleccionado);

  mostrarAutos(autosFiltrados);
}

function obtenerAutosFiltrados(marca, modelo, precio) {
  return autosDisponibles.filter(auto => {
    const cumpleMarca = marca === '' || auto.titulo.includes(marca);
    const cumpleModelo = modelo === '' || auto.titulo.includes(modelo);
    const cumplePrecio = precio === '' || cumpleRangoPrecio(auto.precio, precio);
    return cumpleMarca && cumpleModelo && cumplePrecio;
  });
}

function mostrarAutos(autos) {
  const listaProductos = document.querySelector('#lista-productos');
  listaProductos.innerHTML = '';

  let filaActual = document.createElement('div');
  filaActual.classList.add('row');

  autos.forEach((auto, index) => {
    const columna = document.createElement('div');
    columna.classList.add('col-md-4');

    const galleryBox = document.createElement('div');
    galleryBox.classList.add('gallery_box');

    galleryBox.innerHTML = `
      <div class="gallery_img"><img src="${auto.imagen}"></div>
      <h3 class="types_text">${auto.titulo}</h3>
      <h4 class="subtitle_card">Alquiler por día:</h4>
      <p class="looking_text">$${auto.precio}</p>
      <div class="read_bt"><a href="#" class="reservar-ahora" data-id="${auto.id}">Reservar ahora</a></div>
    `;

    columna.appendChild(galleryBox);
    filaActual.appendChild(columna);


    if ((index + 1) % 3 === 0 || index === autos.length - 1) {
      listaProductos.appendChild(filaActual);
      filaActual = document.createElement('div');
      filaActual.classList.add('row');
    }
  });
}

function cumpleRangoPrecio(precio, rangoSeleccionado) {
  const preciosRango = {
    "1": [10000, 20000],
    "2": [20000, 30000],
    "3": [30000, 40000]
  };

  const [min, max] = preciosRango[rangoSeleccionado];
  return precio >= min && precio <= max;
}

const urlReseñas = "https://jsonplaceholder.typicode.com/comments";
const listaReseñas = document.querySelector("#lista-reseñas");

const imagenes = [
  "./images/client-img1.png",
  "./images/client-img2.png",
];


fetch(urlReseñas)
  .then(response => response.json())
  .then(data => {
    const reseñasLimitadas = data.slice(0, 2);

    reseñasLimitadas.forEach((reseña, index) => {
      const listItem = document.createElement('li');
      listItem.classList.add("reseña-item");
      listItem.innerHTML = `
            <img class="reseña-imagen" src="${imagenes[index % imagenes.length]}">
            <div class="reseña-contenido">
              <p class="reseña-nombre">${reseña.name}</p>
              <p class="reseña-texto">${reseña.body}</p>
            </div>
          `;
      listaReseñas.appendChild(listItem);
    });
  })
  .catch(error => {
    console.error('Error al cargar reseñas:', error);
  });

sendButton.addEventListener("click", function (evt) {
  evt.preventDefault();

  Swal.fire('Mensaje Enviado');
});

suscribeButton.addEventListener("click", function (evt) {
  evt.preventDefault();

  Swal.fire('Te has suscrito');
});