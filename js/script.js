/* =====ANIMACIONES AL HACER SCROLL================= */
const faders = document.querySelectorAll(".fade-in");
const appearOptions = { threshold: 0.2 };

// IntersectionObserver: detecta cuando los elementos entran en pantalla
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return; // si no está visible, no hace nada
    entry.target.classList.add("visible"); // activa animación
    observer.unobserve(entry.target); // deja de observar ese elemento
  });
}, appearOptions);

// Aplica la animación a todos los elementos con fade-in
faders.forEach(fader => appearOnScroll.observe(fader));


/* ============MODALES====== */
const modals = document.querySelectorAll(".modal");
const triggers = document.querySelectorAll("[data-modal]");
const closes = document.querySelectorAll(".close");

// Abrir modal al hacer clic en un trigger
triggers.forEach(trigger => {
  trigger.addEventListener("click", e => {
    e.preventDefault();
    const modalId = trigger.getAttribute("data-modal"); // busca el id del modal
    document.getElementById(modalId).classList.add("active");
  });
});

// Cerrar modal con el botón "X"
closes.forEach(close => {
  close.addEventListener("click", () => {
    close.closest(".modal").classList.remove("active");
  });
});

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener("click", e => {
  modals.forEach(modal => {
    if (e.target === modal) modal.classList.remove("active");
  });
});


/* =======================BOTÓN "SCROLL TO TOP"=========================== */
const scrollBtn = document.getElementById("scrollTopBtn");

// Mostrar/ocultar botón según el scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

// Subir suavemente al hacer clic en el botón
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


/* ==========================CURSOR PERSONALIZADO============ */
const cursor = document.querySelector(".custom-cursor");

// Seguir el movimiento del mouse
document.addEventListener("mousemove", e => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});


