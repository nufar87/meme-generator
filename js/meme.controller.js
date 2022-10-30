'use strict';

var gElCanvas = document.querySelector('canvas');
var gCtx = gElCanvas.getContext('2d');
var gIsStroke;
var gMaxHeight;
var gCanDrag = false;
var gCanShare = false;

function onInit() {
  renderGallery();
  // declaring touchevents
  addTouchListeners();
  addMouseListeners();
}

function addMouseListeners() {
  gElCanvas.onmouseup = mouseUp;
  gElCanvas.onmousedown = canvasClicked;
  gElCanvas.onmousemove = moveLine;
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', (ev) => {
    ev.preventDefault();
    canvasClicked(ev);
  });
  gElCanvas.addEventListener('touchend', (ev) => {
    ev.preventDefault();
    gCanDrag = false;
  });
  gElCanvas.addEventListener('touchmove', (ev) => {
    moveLine(ev);
  });
}

function mouseUp() {
  gElCanvas.style.cursor = 'default';
  gCanDrag = false;
}

function getTouchPos(canvas, mouseEvent) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: mouseEvent.touches[0].clientX - rect.left,
    y: mouseEvent.touches[0].clientY - rect.top,
  };
}

function canvasClicked(ev) {
  if (ev.type === 'click' || ev.type === 'keydown') {
    switchLine();
    addTxt();
    drawMeme();
  }
  var meme = getMeme();
  if (ev.type === 'touchstart') ev.offsetY = getTouchPos(gElCanvas, ev).y;
  meme.lines.forEach((line, idx) => {
    if (meme.selectedLineIdx === idx) gCanDrag = true;
    else if (ev.offsetY <= line.y && ev.offsetY >= line.y - line.size) {
      meme.selectedLineIdx = idx;
      drawMeme();
      gCanDrag = true;
    }
  });
}

function moveLine(ev) {
  ev.preventDefault();
  if (!gCanDrag) return;
  gElCanvas.style.cursor = 'all-scroll';
  ev.preventDefault();
  const line = getMeme().lines[getMeme().selectedLineIdx];
  if (ev.type === 'touchmove') {
    var touchPos = getTouchPos(gElCanvas, ev);
    line.x = touchPos.x;
    line.y = touchPos.y;
  } else {
    line.x = ev.offsetX;
    line.y = ev.offsetY;
  }
  drawMeme();
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function setMaxHeigth(height) {
  gMaxHeight = height;
}

function resizeCanvas() {
  var elContainer = document.querySelector('.canvas-container');
  gElCanvas.width = elContainer.offsetWidth;
  gElCanvas.height = elContainer.offsetHeight;
}

function onOpenMemeEditor(id) {
  document.querySelector('.meme-editor').style.display = 'flex';
  document.querySelector('.gallery-container').style.display = 'none';
  document.querySelector('footer').style.display = 'none';
  resizeCanvas();
  setMaxHeigth(gElCanvas.height);
  //step 1: define the current gMeme
  setMeme(id, gElCanvas);
  //step 2: draw the meme on the canvas + show memeEditor
  drawMeme();
  setInputTxt();
}

function drawMeme() {
  var meme = getMeme();
  var img = new Image();
  img.src = meme.selectedImgurl;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    meme.lines.forEach((line, idx) => {
      if (meme.selectedLineIdx === idx) {
        gCtx.strokeRect(0, line.y - line.size, gElCanvas.width, line.size);
        gCtx.strokeStyle = line.stroke;
      }
      gCtx.fillStyle = line.fill;
      gCtx.font = `${line.size}px ${line.font}`;
      gCtx.textAlign = line.align;
      gCtx.strokeStyle = line.stroke;
      gCtx.strokeText(line.txt, line.x, line.y);
      gCtx.fillText(line.txt, line.x, line.y);
    });
  };
}

function setInputTxt() {
  var elLineInput = document.querySelector('[name="line"]');
  var lineTxt = getMeme().lines[getMeme().selectedLineIdx].txt;
  if (lineTxt === 'Type Something..') {
    elLineInput.value = '';
    elLineInput.ariaPlaceholder = lineTxt;
  } else {
    elLineInput.value = lineTxt;
  }
  elLineInput.focus();
}

function onAddText(elInputVal) {
  addTxt(elInputVal);
  drawMeme();
}

function onAddLine() {
  addLine(gElCanvas);
  drawMeme();
}

function onRemoveLine() {
  removeLine();
  drawMeme();
}

function onAlignText(align) {
  switch (align) {
    case 'left':
      setTxtAlign('left', 10);
      break;
    case 'center':
      setTxtAlign('center', gElCanvas.width / 2);
      break;
    case 'right':
      setTxtAlign('right', gElCanvas.width - 10);
      break;
  }
  drawMeme();
}

function onChangeFontSize(diff) {
  setFontSize(diff);
  drawMeme();
}

function onColorPicker(isStroke) {
  gIsStroke = isStroke;
  var colorInput = document.querySelector('[type=color]');
  colorInput.value = '000';
  colorInput.click();
}

function onColorChange(elColor) {
  setColor(gIsStroke, elColor.value);
  drawMeme();
}

function onDownloadMeme(elLink) {
  const imgContent = gElCanvas.toDataURL('image/jpeg');
  elLink.href = imgContent;
}

function drawMemeForSave() {
  var meme = getMeme();

  var img = new Image();
  img.src = meme.selectedImgurl;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    meme.lines.forEach((line, idx) => {
      gCtx.fillStyle = line.fill;
      gCtx.font = `${line.size}px ${line.font}`;
      gCtx.textAlign = line.align;
      gCtx.strokeStyle = line.stroke;
      gCtx.strokeText(line.txt, line.x, line.y);
      gCtx.fillText(line.txt, line.x, line.y);
    });
  };
}

function onSwitchLines() {
  switchLines();
  drawMeme();
  setInputTxt();
}

function onChangeFontFamily(fontFamily) {
  changeFontFamily(fontFamily);
  drawMeme();
  document.querySelector('[name="fontFamily"]').style.fontFamily =
    document.querySelector('[name="fontFamily"]').value;
}

function onAddEmoji(emoji) {
  addEmoji(emoji, gElCanvas);
  drawMeme();
}
