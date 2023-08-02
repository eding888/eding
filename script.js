const navbar = document.getElementById('navbar');
const infoCard = document.getElementById('infoCard');
const blurb = document.getElementById('blurb');
const icons = document.getElementById('icons');

const configure = document.getElementById('configure');
const configBox = document.getElementById('config-box');
const close = document.getElementById('close');

const scrollThreshold = 400;
window.addEventListener('scroll', () => {
  if (window.scrollY >= scrollThreshold) {
    infoCard.classList.add('animateScroll');
    blurb.classList.add('gone');
    configure.classList.add('gone');
    icons.classList.add('rightAlignedIcons')
  } else {
    blurb.classList.remove('gone');
    configure.classList.remove('gone');
    infoCard.classList.remove('animateScroll');
  }
});

configure.addEventListener('click', () => {
  configBox.classList.add('slideFromBottom');
  configBox.classList.remove('gone');
});

close.addEventListener('click', () => {
  configBox.classList.remove('slideFromBottom');
  configBox.classList.add('gone');
});