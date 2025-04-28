document.addEventListener('DOMContentLoaded', () => {
  const btnLoad = document.getElementById('load-more-projects');
  const container = document.getElementById('projects-container');
  let isExpanded = false;
  let dynamicCards = [];

  function setLinksToOpenInNewTab(parent) {
    parent.querySelectorAll('a').forEach(link => {
      if (link.hostname && link.hostname !== window.location.hostname) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  // Aplica nos links já existentes
  setLinksToOpenInNewTab(document);

  btnLoad.addEventListener('click', () => {
    if (!isExpanded) {
      // cria os dois novos cards
      const card1 = document.createElement('div');
      card1.className = 'card';
      card1.innerHTML = `
        <div class="category">Residencial</div>
        <img src="serviços/instalaçoes eletricas.jpg" alt="Instalação Elétrica - Casa">
        <h3>Instalação Elétrica - Casa Residencial</h3>
        <p>Serviço completo de instalação elétrica residencial, com certificação elétrica e garantia de segurança.</p>
        <div class="tags"></div>
        <a href="https://exemplo1.com" class="card-link">Ver detalhes ➔</a>
      `;

      const card2 = document.createElement('div');
      card2.className = 'card';
      card2.innerHTML = `
        <div class="category">Comercial</div>
        <img src="serviços/consultoria.jpg" alt="Automação de Ar-condicionado">
        <h3>Automação de Ar-condicionado - Empresa</h3>
        <p>Projeto de automação inteligente para ar-condicionado em ambiente corporativo, otimizando consumo e conforto.</p>
        <div class="tags"></div>
        <a href="https://exemplo2.com" class="card-link">Ver detalhes ➔</a>
      `;

      container.appendChild(card1);
      container.appendChild(card2);
      dynamicCards.push(card1, card2);

      // Aplica também nos novos links
      setLinksToOpenInNewTab(card1);
      setLinksToOpenInNewTab(card2);

      btnLoad.textContent = 'Ver menos projetos';
      isExpanded = true;
    } else {
      // remove os cards dinâmicos
      dynamicCards.forEach(c => container.removeChild(c));
      dynamicCards = [];
      btnLoad.textContent = 'Ver todos os projetos';
      isExpanded = false;
    }
  });

  
});
