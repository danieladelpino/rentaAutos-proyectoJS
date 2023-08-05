document.addEventListener("DOMContentLoaded", function () {
  const mostrarCarritoBtn = document.querySelector(".mostrar-carrito");
  const carritoModal = document.querySelector(".carrito-modal");
  const agregarBotones = document.querySelectorAll(".agregar");

  mostrarCarritoBtn.addEventListener("click", function () {
    carritoModal.classList.toggle("animated");
    carritoModal.style.display = carritoModal.style.display === "none" ? "block" : "none";
  });

  agregarBotones.forEach(function (boton) {
    boton.addEventListener("click", function () {
    });
  });
});

function limpiarCarrito() {
  productosCarrito = [];
  vaciarCarrito();
  localStorage.removeItem('productosCarrito');
}

const finalizarCompraBtn = document.getElementById("finalizar-compra");
finalizarCompraBtn.addEventListener("click", function () {
  if (productosCarrito.length === 0) {
    Swal.fire('No puedes finalizar la compra porque el carrito está vacío.');
    return;
  }

  Swal.fire({
    text: "Nos pondremos en contacto contigo para finalizar la compra.",
    icon: "info",
    confirmButtonText: "Aceptar",
  }).then((result) => {
    if (result.isConfirmed) {
      limpiarCarrito();
    }
  });
});

