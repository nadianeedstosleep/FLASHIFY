export function renderLanding(landingModel, container) {
  const main = container;

  const hero = `
    <section class="hero" style="background-image: url('${landingModel.callToAction.backgroundImage}')">
      <div class="hero-content">
        <h1>${landingModel.callToAction.heading}</h1>
        <a href="${landingModel.callToAction.buttonLink}" class="cta-button">${landingModel.callToAction.buttonText}</a>
      </div>
    </section>
  `;

  const features = `
    <section class="features">
      ${landingModel.features.map(f => `
        <div class="feature-item">
          <i class="${f.icon}"></i>
          <h4>${f.title}</h4>
          <p>${f.description}</p>
        </div>
      `).join('')}
    </section>
  `;

  const benefits = landingModel.benefits.map(b => `
    <section class="feature-item ${b.reverse ? 'reverse' : ''}">
      <img src="${b.image}" alt="${b.title}" />
      <div>
        <h2>${b.id}</h2>
        <h3>${b.title}</h3>
        <p>${b.text}</p>
      </div>
    </section>
  `).join('');

  main.innerHTML = hero + features + benefits;
}
