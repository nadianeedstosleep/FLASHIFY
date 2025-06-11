export default class LandingView {
  render(data) {
    const { features, callToAction, benefits } = data;

    return `
      <div class="landing-container">
        <section class="hero" style="background-image: url(${callToAction.backgroundImage});">
          <div class="hero-content">
            <h1>${callToAction.heading}</h1>
            <a href="${callToAction.buttonLink}" class="cta-button">${callToAction.buttonText}</a>
          </div>
        </section>

        <section class="features">
          <div class="features-intro">
            ${features.map(feature => `
              <div>
                <i class="${feature.icon} fa-2x"></i>
                <h3>${feature.title}</h3>
                <p>${feature.description}</p>
              </div>
            `).join('')}
          </div>
          <p style="max-width:720px;margin:2rem auto 0;font-family:Montserrat,sans-serif;font-size:1rem;color:white;">
            We offer personalized, effective learning that fits your needs. Simply upload any PDF and transform it into interactive flashcards powered by active recall and spaced repetition, optimizing your study time for better retention and academic success.
          </p>
        </section>

        <section class="features-details">
          ${benefits.map(benefit => `
            <div class="feature-item${benefit.reverse ? ' reverse' : ''}">
              <div class="feature-item-number">${benefit.id}</div>
              <div style="flex:1;">
                <h4>${benefit.title}</h4>
                <p>${benefit.text}</p>
              </div>
              <img src="${benefit.image}" alt="${benefit.title}" />
            </div>
          `).join('')}
        </section>
      </div>
    `;
  }

  afterRender() {
    console.log('LandingView afterRender called');
  }
}
