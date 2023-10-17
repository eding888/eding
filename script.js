const navbar = document.getElementById('navbar');
const infoCard = document.getElementById('infoCard');
const blurb = document.getElementById('blurb');
const icons = document.getElementById('icons');

const configure = document.getElementById('configure');
const configBox = document.getElementById('config-box');
const close = document.getElementById('close');

const scrollThreshold = window.innerHeight < 900 ? 270 : 400;
console.log(window.innerHeight)
let closed = true;
window.addEventListener('scroll', () => {
  if (window.scrollY >= scrollThreshold) {
    blurb.classList.add('gone');
    configure.classList.add('gone');
    configBox.classList.add('gone');
    infoCard.classList.add('animateScroll');
    icons.classList.add('rightAlignedIcons')
  } else {
    if (!closed){
      configBox.classList.remove('gone');
    }
    blurb.classList.remove('gone');
    configure.classList.remove('gone');
    infoCard.classList.remove('animateScroll');
  }
});



configure.addEventListener('click', () => {
  configBox.classList.add('slideFromBottom');
  configBox.classList.remove('gone');
  closed = false;
});

close.addEventListener('click', () => {
  configBox.classList.remove('slideFromBottom');
  configBox.classList.add('gone');
  closed = true;
});