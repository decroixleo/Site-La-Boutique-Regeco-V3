/* ─── GRID CANVAS ─── */
const canvas = document.getElementById('grid-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawGrid();
  }

  function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(0,255,65,0.08)';
    ctx.lineWidth = 0.5;
    const step = 60;

    for (let x = 0; x <= canvas.width; x += step) {
      ctx.beginPath(); 
      ctx.moveTo(x, 0); 
      ctx.lineTo(x, canvas.height); 
      ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += step) {
      ctx.beginPath(); 
      ctx.moveTo(0, y); 
      ctx.lineTo(canvas.width, y); 
      ctx.stroke();
    }

    ctx.fillStyle = 'rgba(0,255,65,0.15)';
    for (let x = 0; x <= canvas.width; x += step) {
      for (let y = 0; y <= canvas.height; y += step) {
        ctx.beginPath(); 
        ctx.arc(x, y, 1.2, 0, Math.PI * 2); 
        ctx.fill();
      }
    }
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
}

/* ─── NAVBAR SCROLL EFFECT ─── */
const navbar = document.querySelector('nav');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ─── REVEAL ON SCROLL ─── */
const reveals = document.querySelectorAll('.reveal');
if (reveals.length > 0) {
  const io = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => io.observe(el));
}

/* ─── COUNT UP STATS ─── */
function countUp(el, target) {
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { 
      current = target; 
      clearInterval(timer); 
    }
    el.textContent = Math.floor(current).toLocaleString('fr-FR');
  }, 25);
}

const statsSection = document.getElementById('stats');
if (statsSection) {
  const statsObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        document.querySelectorAll('[data-target]').forEach(el => {
          countUp(el, parseInt(el.dataset.target));
        });
        statsObs.disconnect();
      }
    });
  }, { threshold: 0.3 });
  statsObs.observe(statsSection);
}

/* ─── CONTACT FORM ─── */
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('.btn-submit');
  const originalText = btn.textContent;
  
  btn.textContent = '⏳ Envoi en cours...';
  btn.disabled = true;
  
  const formData = new FormData(form);
  
  fetch('contact-handler.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      btn.textContent = '✅ Message envoyé !';
      btn.style.background = 'linear-gradient(135deg, #00b894, #00f5a0)';
      setTimeout(() => {
        form.reset();
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 2500);
    } else {
      btn.textContent = '❌ Erreur - Réessayez';
      btn.style.background = '#e74c3c';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }
  })
  .catch(error => {
    console.error('Erreur:', error);
    btn.textContent = '❌ Erreur réseau';
    btn.style.background = '#e74c3c';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  });
}

/* ─── DEVIS FORM ─── */
function handleDevis(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('.btn-devis');
  const originalText = btn.textContent;
  
  btn.textContent = '⏳ Envoi en cours...';
  btn.disabled = true;
  
  const formData = new FormData(form);
  
  fetch('devis-handler.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      btn.textContent = '✅ Demande envoyée !';
      btn.style.background = 'linear-gradient(135deg, #00b894, #00f5a0)';
      setTimeout(() => {
        form.reset();
        const budgetDisplay = document.getElementById('budget-display');
        if (budgetDisplay) budgetDisplay.textContent = '500 €';
        document.querySelectorAll('.checkbox-item').forEach(item => {
          item.style.borderColor = '';
          item.style.background = '';
          const checkBox = item.querySelector('.check-box');
          if (checkBox) checkBox.textContent = '';
        });
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3500);
    } else {
      btn.textContent = '❌ Erreur - Réessayez';
      btn.style.background = '#e74c3c';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }
  })
  .catch(error => {
    console.error('Erreur:', error);
    btn.textContent = '❌ Erreur réseau';
    btn.style.background = '#e74c3c';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  });
}

/* ─── TOGGLE SERVICE ─── */
function toggleService(header) {
  const block = header.parentElement;
  block.classList.toggle('open');
}

/* ─── TABS ─── */
function showTab(tab) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  const tabContent = document.getElementById(tab);
  if (tabContent) tabContent.classList.add('active');
  if (event && event.target) event.target.classList.add('active');
}