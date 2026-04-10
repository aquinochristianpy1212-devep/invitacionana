const invitationData = {
  quinceanera: "Camila Benítez",
  fechaEventoISO: "2026-10-25T21:00:00",
  fechaVisible: "Sábado 25 de Octubre de 2026 · 21:00 hs",

  fotos: [
    "img/foto1.jpg",
    "img/foto2.jpg",
    "img/foto3.jpg"
  ],

  ceremonia: {
    nombre: "Parroquia San José",
    direccion: "Av. Ejemplo 123, Ciudad",
    hora: "19:00 hs",
    ubicacion: "https://maps.google.com"
  },

  recepcion: {
    nombre: "Salón Encanto Real",
    direccion: "Ruta Ejemplo km 5, Ciudad",
    hora: "21:00 hs",
    ubicacion: "https://maps.google.com"
  },

  dressCode: {
    titulo: "Elegante",
    texto: "Prepárate para una noche mágica en un bosque encantado, llena de luz, belleza y momentos inolvidables. Tu presencia hará aún más especial esta celebración."
  },

  whatsapp: {
    telefono: "595981000000",
    mensaje: "Hola, confirmo mi asistencia a los XV de Camila Benítez."
  },

  muralPadlet: "https://padlet.com",
  footerMensaje: "Gracias por acompañarme en este momento tan especial."
};

const intro = document.getElementById("intro");
const invitation = document.getElementById("invitation");
const openInvitationBtn = document.getElementById("openInvitation");
const bgMusic = document.getElementById("bgMusic");

let alreadyOpened = false;

function loadInvitationData() {
  document.getElementById("nombreQuince").textContent = invitationData.quinceanera;
  document.getElementById("fechaPrincipal").textContent = invitationData.fechaVisible;

  document.getElementById("foto1").src = invitationData.fotos[0];
  document.getElementById("foto2").src = invitationData.fotos[1];
  document.getElementById("foto3").src = invitationData.fotos[2];

  document.getElementById("iglesiaNombre").textContent = invitationData.ceremonia.nombre;
  document.getElementById("iglesiaDireccion").textContent = invitationData.ceremonia.direccion;
  document.getElementById("iglesiaHora").textContent = invitationData.ceremonia.hora;
  document.getElementById("linkIglesia").href = invitationData.ceremonia.ubicacion;

  document.getElementById("eventoNombre").textContent = invitationData.recepcion.nombre;
  document.getElementById("eventoDireccion").textContent = invitationData.recepcion.direccion;
  document.getElementById("eventoHora").textContent = invitationData.recepcion.hora;
  document.getElementById("linkEvento").href = invitationData.recepcion.ubicacion;

  document.getElementById("dressCodeTitulo").textContent = invitationData.dressCode.titulo;
  document.getElementById("dressCodeTexto").textContent = invitationData.dressCode.texto;

  const whatsappLink = `https://wa.me/${invitationData.whatsapp.telefono}?text=${encodeURIComponent(invitationData.whatsapp.mensaje)}`;
  document.getElementById("confirmarBtn").href = whatsappLink;

  document.getElementById("muralBtn").href = invitationData.muralPadlet;
  document.getElementById("footerMensaje").textContent = invitationData.footerMensaje;
}

function updateCountdown() {
  const targetDate = new Date(invitationData.fechaEventoISO).getTime();
  const now = new Date().getTime();
  const difference = targetDate - now;

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (difference <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

async function openInvitation() {
  if (alreadyOpened) return;
  alreadyOpened = true;

  openInvitationBtn.classList.add("open");

  try {
    bgMusic.volume = 0.85;
    await bgMusic.play();
  } catch (err) {
    console.log("Audio bloqueado por el navegador:", err);
  }

  setTimeout(() => {
    intro.classList.add("hide");
  }, 1100);

  setTimeout(() => {
    invitation.classList.add("show");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 1700);
}

openInvitationBtn.addEventListener("click", openInvitation);

loadInvitationData();
updateCountdown();
setInterval(updateCountdown, 1000);