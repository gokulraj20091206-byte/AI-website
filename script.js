const navigation = document.querySelector('.site-nav');
const menuToggle = document.querySelector('.menu-toggle');
const pageName = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.site-nav a').forEach((link) => {
  if (link.getAttribute('href') === pageName) {
    link.setAttribute('aria-current', 'page');
  }
});

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

if (navigation && menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuToggle.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('is-open');
    }
  });
}

const contactForm = document.querySelector('#contact-form');

if (contactForm instanceof HTMLFormElement) {
  const feedback = document.querySelector('#form-feedback');

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      feedback.textContent = 'Please check the required fields and enter a valid email address.';
      feedback.classList.add('is-error');
      return;
    }

    feedback.textContent = 'Your details look good. This demo form is not connected to an email service yet.';
    feedback.classList.remove('is-error');
    contactForm.reset();
  });

  contactForm.addEventListener('input', () => {
    feedback.textContent = '';
    feedback.classList.remove('is-error');
  });
}
