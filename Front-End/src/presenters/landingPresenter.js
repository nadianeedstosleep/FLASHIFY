// landingPresenter.js
import LandingModel from '../models/landingModel.js';
import LandingView from '../views/landingView.js';
import { createHeader } from '../components/landingHeader.js';
import { createFooter } from '../components/footer.js';
import '../styles/landingHeaderStyle.css';
import '../styles/footerStyle.css';
import '../styles/landingStyle.css';

export default class LandingPresenter {
  constructor(rootElement) {
    // rootElement ini seharusnya adalah <main id="main-content"></main> dari index.html
    this.rootElement = rootElement;
    this.model = new LandingModel();
    this.view = new LandingView();
  }

  async render() {
    const features = this.model.getFeatures();
    const callToAction = this.model.getCallToAction();
    const benefits = this.model.getBenefits();

    // *** PERBAIKAN PENTING DI SINI ***
    // Bersihkan isi dari rootElement (<main id="main-content"></main>)
    // Ini penting jika ada konten lama atau loader yang perlu dihapus sebelum menyisipkan yang baru.
    this.rootElement.innerHTML = '';

    // Insert header
    const header = createHeader();
    this.rootElement.appendChild(header);

    // Langsung sisipkan string HTML dari LandingView ke dalam rootElement.
    // Metode `insertAdjacentHTML` lebih efisien daripada `innerHTML` untuk menambahkan,
    // dan ini menghindari pembuatan ID duplikat.
    this.rootElement.insertAdjacentHTML('beforeend', this.view.render({ features, callToAction, benefits }));

    // Insert footer
    const footer = createFooter();
    this.rootElement.appendChild(footer);

    // Tidak perlu mengembalikan string kosong dari render()
    // Karena fungsi ini bertugas memanipulasi DOM, bukan mengembalikan string.
    // return ''; // Baris ini bisa dihapus atau di-comment
  }

  async afterRender() {
    console.log('LandingView afterRender called from Presenter'); // Tambahkan log untuk konfirmasi
    this.view.afterRender();
  }
}