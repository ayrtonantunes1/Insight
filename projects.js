document.addEventListener('DOMContentLoaded', () => {
  // === PARTE 1: Alternância de tema claro/escuro ===
  const checkbox = document.getElementById('toggle-theme-checkbox');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDark)) {
    document.body.classList.add('dark-theme');
    checkbox.checked = true;
  }
  
  checkbox.addEventListener('change', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
  

  // === PARTE 2: Menu hambúrguer ===
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  const navLinks = document.querySelectorAll('.nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });

  // === PARTE 3: Links externos abrem em nova aba ===
  function setLinksToOpenInNewTab(parent) {
    parent.querySelectorAll('a').forEach(link => {
      if (link.hostname && link.hostname !== window.location.hostname) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  setLinksToOpenInNewTab(document);

  // === PARTE 4: Botão "Ver todos os projetos" ===
  const btnLoad = document.getElementById('load-more-projects');
  const container = document.getElementById('projects-container');
  let isExpanded = false;
  let dynamicCards = [];

  btnLoad.addEventListener('click', () => {
    if (!isExpanded) {
      const card1 = document.createElement('div');
      card1.className = 'card';
      card1.innerHTML = `
        <div class="category">Residencial</div>
        <img src="serviços/instalaçoes eletricas.jpg" alt="Instalação Elétrica - Casa">
        <h3>Instalação Elétrica - Casa Residencial</h3>
        <p>Serviço completo de instalação elétrica residencial, com certificação elétrica e garantia de segurança.</p>
        <div class="tags"></div>
        <a href="#" class="card-link">Ver detalhes ➔</a>
      `;

      const card2 = document.createElement('div');
      card2.className = 'card';
      card2.innerHTML = `
        <div class="category">Comercial</div>
        <img src="serviços/consultoria.jpg" alt="Automação de Ar-condicionado">
        <h3>Automação de Ar-condicionado - Empresa</h3>
        <p>Projeto de automação inteligente para ar-condicionado em ambiente corporativo, otimizando consumo e conforto.</p>
        <div class="tags"></div>
        <a href="#" class="card-link">Ver detalhes ➔</a>
      `;

      container.appendChild(card1);
      container.appendChild(card2);
      dynamicCards.push(card1, card2);

      setLinksToOpenInNewTab(card1);
      setLinksToOpenInNewTab(card2);

      btnLoad.textContent = 'Ver menos projetos';
      isExpanded = true;
    } else {
      dynamicCards.forEach(c => container.removeChild(c));
      dynamicCards = [];
      btnLoad.textContent = 'Ver todos os projetos';
      isExpanded = false;
    }
  });
});
