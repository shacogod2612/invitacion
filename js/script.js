window.addEventListener('DOMContentLoaded', () => {

  // 1. ANIMACIÓN DE LAS LETRAS (HAPPY BIRTHDAY)
  const animateText = (selector) => {
    const element = document.querySelector(selector);
    if (!element) return;
    
    const text = element.innerText || element.textContent;
    element.innerHTML = ''; 
    
    Array.from(text.trim()).forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.animationDelay = `${index * 0.12}s`; 
      element.appendChild(span);
    });
  };

  animateText('.title-happy');
  animateText('.title-birthday');

  // 2. CONTADOR REGRESIVO (05 DE SEPTIEMBRE - 10:00 PM)
  const now = new Date();
  let partyYear = now.getFullYear();

  // Si Septiembre 5 ya pasó este año, apunta al próximo año
  if (now.getMonth() > 8 || (now.getMonth() === 8 && now.getDate() > 5)) {
    partyYear += 1;
  }

  // Fecha del evento (Mes 8 = Septiembre en JS porque empieza en 0)
  const partyDate = new Date(partyYear, 8, 5, 22, 0, 0).getTime();

  function updateCountdown() {
    const currentTime = new Date().getTime();
    const diff = partyDate - currentTime;

    if (diff <= 0) {
      const container = document.querySelector('.countdown-container');
      if (container) {
        container.innerHTML = '<div class="countdown-title" style="font-size:1.3rem;">¡ES HOY! ¡A GOZAR! 🎉</div>';
      }
      return;
    }

    // Cálculos de tiempo
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Obtener elementos por ID
    const elDays = document.getElementById('days');
    const elHours = document.getElementById('hours');
    const elMinutes = document.getElementById('minutes');
    const elSeconds = document.getElementById('seconds');

    // Inyectar valores formateados a 2 dígitos
    if (elDays) elDays.textContent = String(days).padStart(2, '0');
    if (elHours) elHours.textContent = String(hours).padStart(2, '0');
    if (elMinutes) elMinutes.textContent = String(minutes).padStart(2, '0');
    if (elSeconds) elSeconds.textContent = String(seconds).padStart(2, '0');
  }

  // Iniciar el contador
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 3. REPRODUCTOR DE MÚSICA REAL (Optimizado para móviles)
  const playBtn = document.getElementById('playBtn');
  const audio = document.getElementById('audioPlayer');

  if (playBtn && audio) {
    playBtn.addEventListener('click', () => {
      if (audio.paused) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            playBtn.textContent = '❚❚';
          }).catch(error => {
            console.error("Error al reproducir audio:", error);
          });
        }
      } else {
        audio.pause();
        playBtn.textContent = '▶';
      }
    });

    // Si la canción termina, volver al icono de Play
    audio.addEventListener('ended', () => {
      playBtn.textContent = '▶';
    });
  }
});