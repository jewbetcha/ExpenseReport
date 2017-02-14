// Styles
//import './styles/font.scss';
import './styles/base.scss'

// Active state for nav links
const navLinks = document.querySelectorAll('.nav a');

for (let i of navLinks) {
  const href = i.getAttribute('href');
  if (window.location.pathname === href) {
    i.classList.add('active');
  }
}
