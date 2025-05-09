// contato.js
// Unifica funcionalidades: tema, menu, links externos, projetos e envio EmailJS (confirmação ao usuário)

// IDs EmailJS
const EMAILJS_USER_ID           = 'xiMgjlLfTqUZ07lmo';
const EMAILJS_SERVICE_ID        = 'service_8d8cbxr';
const EMAILJS_TEMPLATE_CONFIRM  = 'template_confirmation';  // ajuste aqui se seu ID for diferente

document.addEventListener('DOMContentLoaded', () => {
  // === Inicializa EmailJS ===
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_USER_ID);
  }

  // === PARTE 1: Tema claro/escuro ===
  const checkbox = document.getElementById('toggle-theme-checkbox');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (checkbox) {
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDark)) {
      document.body.classList.add('dark-theme');
      checkbox.checked = true;
    }
    checkbox.addEventListener('change', () => {
      document.body.classList.toggle('dark-theme');
      localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });
  }

  // === PARTE 2: Menu hambúrguer ===
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu    = document.getElementById('nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
    document.querySelectorAll('.nav a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }

  // === PARTE 3: Links externos nova aba ===
  (function setLinks(parent) {
    parent.querySelectorAll('a').forEach(link => {
      if (link.hostname && link.hostname !== window.location.hostname) {
        link.setAttribute('target','_blank');
        link.setAttribute('rel','noopener noreferrer');
      }
    });
  })(document);

  // === PARTE 4: Projetos dinâmicos ===
  const btnLoad = document.getElementById('load-more-projects');
  const container = document.getElementById('projects-container');
  let isExpanded = false;
  let dynamicCards = [];

  if (btnLoad && container) {
    btnLoad.addEventListener('click', () => {
      if (!isExpanded) {
        const items = [
          { type: 'Residencial', img: 'instalaçoes eletricas.jpg', title: 'Instalação Elétrica - Casa Residencial', desc: 'Serviço completo de instalação elétrica residencial, com certificação elétrica e garantia de segurança.' },
          { type: 'Comercial',    img: 'consultoria.jpg',            title: 'Automação de Ar-condicionado - Empresa',      desc: 'Projeto de automação inteligente para ar-condicionado em ambiente corporativo, otimizando consumo e conforto.' }
        ];

        items.forEach(item => {
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `
            <div class="category">${item.type}</div>
            <img src="serviços/${item.img}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
            <a href="#" class="card-link">Ver detalhes ➔</a>
          `;
          container.appendChild(card);
          dynamicCards.push(card);
          (function setLinks(c){ c.querySelectorAll('a').forEach(l=>{ if(l.hostname && l.hostname !== window.location.hostname){ l.target='_blank'; l.rel='noopener noreferrer'; }}); })(card);
        });

        btnLoad.textContent = 'Ver menos projetos';
        isExpanded = true;
      } else {
        dynamicCards.forEach(c => c.remove());
        dynamicCards = [];
        btnLoad.textContent = 'Ver todos os projetos';
        isExpanded = false;
      }
    });
  }

  // === PARTE 5: Envio formulário usando apenas template_confirmation ===
  const form = document.getElementById('form-contato');
  if (form && typeof emailjs !== 'undefined') {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const nome     = form.nome.value.trim();
      const email    = form.email.value.trim();
      const assunto  = form.assunto.value.trim();
      const mensagem = form.mensagem.value.trim();

      if (!nome || !email || !assunto || !mensagem) {
        alert('Por favor, preencha todos os campos.');
        return;
      }

      // Envio único: template_confirmation para o usuário
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_CONFIRM, {
        to_email: email,
        name: nome,
        title: assunto,
        message: mensagem,
        website_link: window.location.origin
      })
      .then(() => {
        console.log('Confirmação enviada ao usuário');
        alert('Obrigado pelo contato! Confira sua caixa de entrada.');
        form.reset();
      })
      .catch(err => {
        console.error('Erro no envio de confirmação:', err);
        alert('Erro ao enviar confirmação. Veja console para detalhes.');
      });
    });
  }
});
