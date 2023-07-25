document.addEventListener("DOMContentLoaded", function() {
    const mostrarCarritoBtn = document.querySelector(".mostrar-carrito");
    const carritoModal = document.querySelector(".carrito-modal");
    const agregarBotones = document.querySelectorAll(".agregar");
    const itemsList = document.querySelector(".items");
    let total = 0;
  
    mostrarCarritoBtn.addEventListener("click", function() {
      carritoModal.classList.toggle("animated"); 
      carritoModal.style.display = carritoModal.style.display === "none" ? "block" : "none";
    });
  
    agregarBotones.forEach(function(boton) {
      boton.addEventListener("click", function() {
      });
    });
  });
  
  function mostrarMensaje(mensaje) {
    const mensajeModal = document.getElementById('mensaje-modal');
    const mensajeTexto = document.getElementById('mensaje-texto');
  
    mensajeTexto.textContent = mensaje;
    mensajeModal.style.display = 'block';
  
    // Agregar evento al botón de cerrar
    const cerrarMensajeBtn = document.getElementById('cerrar-mensaje');
    cerrarMensajeBtn.addEventListener('click', () => {
      mensajeModal.style.display = 'none';
    });
  }
  