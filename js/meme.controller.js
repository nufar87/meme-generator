'use strict';

var gElCanvas;
var gCtx;
var gImg;
var gSelectedLineIdx = 0;
var gIsStroke;
var gMaxHeight;

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function renderMeme() {
  clearCanvas();
  gCtx.drawImage(gImg, 0, 0, gElCanvas.width, gElCanvas.height);
  var lines = returnLines();
  lines.forEach((line) => drawText(line));
}

function resizeCanvas() {
  var elContainer = document.querySelector('.canvas-container');
  gElCanvas.width = elContainer.offsetWidth;
  gElCanvas.height = elContainer.offsetHeight;
}
//////////
function onOpenMemeEditor(id) {
  document.querySelector('.gallery-container').style.display = 'none';
  document.querySelector('.meme-editor').style.display = 'flex';
  gElCanvas = document.querySelector('canvas');
  gCtx = gElCanvas.getContext('2d');
  resizeCanvas();
  onImgSelect(id);
  setMaxHeigth(gElCanvas.height);
}

function onImgSelect(id) {
  var img = getImgById(id);
  createMeme(img.id, img.url);
  drawImgFromlocal(gMeme.selectedImgurl);
}

function drawImgFromlocal(url) {
  gImg = new Image();
  gImg.src = url;
  gImg.onload = () => {
    gCtx.drawImage(gImg, 0, 0, gElCanvas.width, gElCanvas.height);
  };
}

function renderMeme() {
  clearCanvas();
  gCtx.drawImage(gImg, 0, 0, gElCanvas.width, gElCanvas.height);
  var lines = returnLines();
  lines.forEach((line) => drawText(line));
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function setMaxHeigth(height) {
  gMaxHeight = height;
}

function onRemoveLine() {
  removeLineFromMeme(gSelectedLineIdx);
  document.querySelector('[name=line]').value = '';
  renderMeme();
}

function onAddText(elInput) {
  createTxt(gSelectedLineIdx, elInput, gElCanvas.width / 2);
  renderMeme();
}

function drawText(line) {
  if (!line) return;
  gCtx.lineWidth = '4';
  gCtx.font = `${line.size}px impact`;
  gCtx.textAlign = line.align;
  gCtx.strokeStyle = line.strock;
  gCtx.fillStyle = line.fill;
  gCtx.strokeText(line.txt, line.width, line.height);
  gCtx.fillText(line.txt, line.width, line.height);
}

function onAlignText(align) {
  switch (align) {
    case 'left':
      setTxtAlign(gSelectedLineIdx, 'left', 10);
      break;
    case 'center':
      setTxtAlign(gSelectedLineIdx, 'center', gElCanvas.width / 2);
      break;
    case 'right':
      setTxtAlign(gSelectedLineIdx, 'right', gElCanvas.width - 10);
      break;
  }
  renderMeme();
}

function onChangeFontSize(isBigger) {
  setFontSize(isBigger, gSelectedLineIdx);
  renderMeme();
}

function onColorPicker(isStroke) {
  gIsStroke = isStroke;
  var colorInput = document.querySelector('[type=color]');
  colorInput.value = '000';
  colorInput.click();
}

function onColorChange(elColor) {
  setColor(gSelectedLineIdx, gIsStroke, elColor.value);
  renderMeme();
}

function onDownloadMeme(elLink) {
  const imgContent = gElCanvas.toDataURL('image/jpeg');
  elLink.href = imgContent;
}

// TODO
function OnSwitchLines() {}
function onShareMeme(elLink) {}
