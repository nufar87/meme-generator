'use strict';
var gImgs;

function renderGallery() {
  gImgs = getImgs();
  let strHTML = gImgs
    .map(
      (img) =>
        `<img id=${img.id} src="${img.url}" onclick="onOpenMemeEditor(${img.id})" />`
    )
    .join('');
  document.querySelector('.grid-gallery').innerHTML = strHTML;
}

function toggleMenu() {
  document.getElementById('mainMenu').classList.toggle('open');
  document.querySelector('.show-menu').classList.toggle('open');
}
