export function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';

  footer.innerHTML = `
    <div class="footer__sections">
      <div class="footer__section">
        <h4>About Us</h4>
        <ul>
          <li><a href="#">About Flashify</a></li>
          <li><a href="#">Address</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Blog</a></li>
        </ul>
      </div>
      <div class="footer__section">
        <h4>Explore Flashify</h4>
        <ul>
          <li><a href="#">Premium</a></li>
          <li><a href="#">Help and Support</a></li>
        </ul>
      </div>
      <div class="footer__section">
        <h4>Legal and Accessibility</h4>
        <ul>
          <li><a href="#">Accessibility Statement</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
      </div>
      <div class="footer__section footer__social">
        <h4>Social Media Official Accounts</h4>
        <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
        <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
        <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
        <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
      </div>
    </div>
    <div class="footer__bottom">
      <strong>Flashify</strong>
      <span>© 2025 Flashify. All Rights Reserved</span>
    </div>
  `;

  return footer;
}