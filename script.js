function setMenu(open) {
  const nav = document.getElementById("nav");
  const btn = document.getElementById("menu-toggle");
  nav.classList.toggle("active", open);
  btn.classList.toggle("open", open);
  btn.setAttribute("aria-expanded", open ? "true" : "false");
  btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
}

function toggleMenu() {
  const nav = document.getElementById("nav");
  setMenu(!nav.classList.contains("active"));
}

// Cerrar el menú al elegir una opción
document.querySelectorAll("#nav a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

// Ocultar el indicador de scroll cuando el usuario ya empezó a deslizar
(function () {
  const indicator = document.getElementById("scroll-indicator");
  if (!indicator) return;
  const check = () => indicator.classList.toggle("hidden", window.scrollY > 60);
  window.addEventListener("scroll", check, { passive: true });
  check();
})();

const contactForm = document.getElementById("form");
if (contactForm) {
  const statusEl = document.getElementById("form-status");
  const submitBtn = document.getElementById("form-btn");

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    statusEl.className = "form-status";
    statusEl.textContent = "";
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Enviando...";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        statusEl.textContent =
          "¡Gracias! Su mensaje ha sido enviado correctamente.";
        statusEl.classList.add("success");
        contactForm.reset();
      } else {
        const data = await response.json().catch(() => ({}));
        statusEl.textContent = data.errors
          ? data.errors.map((err) => err.message).join(", ")
          : "No se pudo enviar el mensaje. Intente de nuevo.";
        statusEl.classList.add("error");
      }
    } catch (err) {
      statusEl.textContent =
        "Error de conexión. Revise su internet e intente de nuevo.";
      statusEl.classList.add("error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

const servicesData = {
  notarial: {
    title: "Notarial & Registral",
    image: "notarial2.png",
    description:
      "Asesoría integral en trámites notariales y registrales. Elaboración de escrituras, autenticaciones, sucesiones, compraventas, estudios de títulos y acompañamiento jurídico especializado.",
  },

  propiedad: {
    title: "Propiedad Horizontal",
    image: "propiedad-horizontal2.png",
    description:
      "Asesoría jurídica para conjuntos residenciales y edificios. Reglamentos de propiedad horizontal, conflictos entre copropietarios, administración y representación legal.",
  },

  saneamiento: {
    title: "Saneamiento de Predios",
    image: "saneamiento2.png",
    description:
      "Procesos de legalización, clarificación de propiedad, corrección de áreas, falsa tradición y regularización jurídica de predios rurales y urbanos.",
  },

  civil: {
    title: "Derecho Civil",
    image: "derecho-civil2.png",
    description:
      "Representación y asesoría en procesos civiles, responsabilidad contractual, cobros, obligaciones, indemnizaciones y solución de conflictos jurídicos.",
  },

  divorcio: {
    title: "Separación & Divorcio",
    image: "divorcio2.png",
    description:
      "Acompañamiento legal en procesos de divorcio, separación de bienes, custodia, alimentos y conciliaciones familiares.",
  },
};

function openPopup(service) {
  const data = servicesData[service];
  if (!data) return;

  const popup = document.getElementById("popup");
  const popupImg = document.getElementById("popup-image");
  const moreButton = document.getElementById("popup-more");

  document.getElementById("popup-title").innerText = data.title;
  document.getElementById("popup-description").innerText = data.description;

  popupImg.src = data.image;
  popupImg.alt = data.title;

  if (moreButton) {
    const servicePages = {
      notarial: "derecho-notarial-registral-neiva.html",
      propiedad: "abogado-propiedad-horizontal-neiva.html",
      saneamiento: "saneamiento-predios-neiva.html",
      civil: "abogado-derecho-civil-neiva.html",
      divorcio: "abogado-divorcio-neiva.html"
    };
    moreButton.href = servicePages[service] || "index.html#servicios";
    moreButton.hidden = !servicePages[service];
  }

  popup.classList.add("active");
  popup.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}
function closePopup() {
  document.getElementById("popup").classList.remove("active");
  document.getElementById("popup").setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function openCalendly() {
  // Verificamos si el objeto Calendly existe en el scope global
  if (window.Calendly) {
    Calendly.initPopupWidget({
      url: "https://calendly.com/jammfer/30min",
    });
  } else {
    // Si no carga, podemos redirigir directamente a la web de Calendly
    // como plan de respaldo en lugar de solo mostrar una alerta.
    window.open("https://calendly.com/jammfer/30min", "_blank");
  }
}
// Esperar a que todo el HTML esté cargado
document.addEventListener("DOMContentLoaded", () => {
  const cookieBanner = document.getElementById("cookieBanner");
  const acceptCookies = document.getElementById("acceptCookies");

  // Verificar si ya aceptó
  if (!localStorage.getItem("cookiesAccepted")) {
    // Retraso para que aparezca elegantemente
    setTimeout(() => {
      if (cookieBanner) {
        cookieBanner.classList.add("show");
      }
    }, 1200);
  }

  // Evento del botón
  if (acceptCookies) {
    acceptCookies.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "true");
      cookieBanner.classList.remove("show");
    });
  }
});

// Cerrar popup al hacer clic fuera de la tarjeta o con la tecla Escape
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  if (popup) {
    popup.addEventListener("click", (e) => {
      if (e.target === popup) closePopup();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePopup();
  });
});
