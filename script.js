// Año del pie de página
document.getElementById("anio").textContent = new Date().getFullYear();

// Tema claro / oscuro (se recuerda entre visitas)
const raiz = document.documentElement;
const botonTema = document.getElementById("tema");

function aplicarTema(tema) {
  if (tema === "claro") raiz.setAttribute("data-tema", "claro");
  else raiz.removeAttribute("data-tema");
  botonTema.textContent = tema === "claro" ? "☀️" : "🌙";
}

let temaGuardado = "oscuro";
try { temaGuardado = localStorage.getItem("tema") || "oscuro"; } catch (e) {}
aplicarTema(temaGuardado);

botonTema.addEventListener("click", () => {
  const nuevo = raiz.getAttribute("data-tema") === "claro" ? "oscuro" : "claro";
  aplicarTema(nuevo);
  try { localStorage.setItem("tema", nuevo); } catch (e) {}
});

// Filtro de proyectos
const botones = document.querySelectorAll(".filter");
const tarjetas = document.querySelectorAll("#lista-proyectos .card");

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    botones.forEach((b) => b.classList.remove("active"));
    boton.classList.add("active");
    const filtro = boton.dataset.filter;
    tarjetas.forEach((tarjeta) => {
      const categorias = tarjeta.dataset.cat.split(" ");
      const mostrar = filtro === "todos" || categorias.includes(filtro);
      tarjeta.classList.toggle("hide", !mostrar);
    });
  });
});

// Si una captura no existe todavía, se muestra el emoji de la tarjeta
document.querySelectorAll(".thumb img, .foto img").forEach((img) => {
  const marcar = () => img.parentElement.classList.add("no-img");
  img.addEventListener("error", marcar);
  if (img.complete && img.naturalWidth === 0) marcar();
});

// Aparición suave al hacer scroll
const secciones = document.querySelectorAll(".section, .card");
secciones.forEach((el) => el.classList.add("reveal"));
const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observador.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 }
);
secciones.forEach((el) => observador.observe(el));
