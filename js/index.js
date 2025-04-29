// Setup header menu toggle
const headerMenuToggle = document.querySelector('.header__menu-toggle');
const headerMenu = document.querySelector('.header-menu');
headerMenuToggle.addEventListener('click', () => {
  if (window.innerWidth >= 992) {
    return;
  }
  if (headerMenu.classList.contains('active')) {
    headerMenu.classList.add('is-closing');
    setTimeout(() => {
      headerMenu.classList.remove('is-closing');
    }, 700);
  }
  headerMenuToggle.classList.toggle('active');
  headerMenu.classList.toggle('active');
});
