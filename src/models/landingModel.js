export default class LandingModel {
  getFeatures() {
    return [
      {
        icon: 'fa-solid fa-layer-group',
        title: 'Flashcards',
        description: 'Turn your notes or PDFs into interactive flashcards effortlessly'
      },
      {
        icon: 'fa-solid fa-brain',
        title: 'Active Recall',
        description: 'Engage with your study materials by actively recalling information'
      },
      {
        icon: 'fa-solid fa-users',
        title: 'Community',
        description: 'Join a dynamic learning community, and learn from others.'
      }
    ];
  }

  getCallToAction() {
    return {
      backgroundImage: '/assets/images/landing-hero.jpg',
      heading: 'Boost your memory, boost your grades.',
      buttonText: 'Get Started',
      buttonLink: '#/register',
      backgroundImage: '/assets/images/landing-hero.jpg'
    };
  }

  getBenefits() {
    return [
      {
        id: '01',
        title: 'Create Flashcards with Ease',
        text: 'Turn your notes or PDFs into interactive flashcards effortlessly. Simply upload your material, and let Flashify do the rest.',
        image: 'assets/images/landing-1.png',
        reverse: false
      },
      {
        id: '02',
        title: 'Active Recall for Better Retention',
        text: 'Engage with your study materials by actively recalling information, boosting memory retention and helping you learn more effectively.',
        image: 'assets/images/landing-2.png',
        reverse: true
      },
      {
        id: '03',
        title: 'Access a Community of Learners',
        text: 'Join a dynamic learning community where you can share flashcards, discover new topics, and learn from others.',
        image: 'assets/images/landing-3.png',
        reverse: false
      }
    ];
  }
}