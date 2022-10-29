'use strict';

var gMeme = {};
const KEY = 'imgDB';
var gImgs = _createImgs();

function getMeme() {
  return gMeme;
}

//defined the current gMeme object that we'll draw on the canvas
function setMeme(id, canvas) {
  gMeme.selectedLineIdx = 0;
  gMeme.lines = createLines(canvas);
  gMeme.selectedImgId = id;
  gMeme.selectedImgurl = getImgById(id).url;
}

//insert lines array that we'll initially draw on the canvas;
function createLines(canvas) {
  return [
    {
      txt: 'Type Something..',
      font: 'impact',
      size: 30,
      align: 'center',
      height: 30,
      stroke: '#000',
      fill: '#fff',
      y: 70,
      x: canvas.width / 2,
    },
    {
      txt: 'Type Something..',
      font: 'impact',
      size: 30,
      align: 'center',
      height: 30,
      stroke: '#000',
      fill: '#fff',
      y: canvas.height - 55,
      x: canvas.width / 2,
    },
  ];
}

function addTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function addLine(canvas) {
  gMeme.lines.push({
    txt: 'Type Something..',
    font: 'impact',
    size: 30,
    align: 'center',
    height: 30,
    stroke: '#000',
    fill: '#fff',
    y: canvas.height / 2,
    x: canvas.width / 2,
  });
}

function switchLines() {
  var currIdx = gMeme.selectedLineIdx;
  if (currIdx === gMeme.lines.length - 1) {
    currIdx = 0;
  } else {
    currIdx += 1;
  }
  gMeme.selectedLineIdx = currIdx;
}

function removeLine() {
  if (gMeme.lines.length === 0) return;
  gMeme.lines.splice(gMeme.selectedLineIdx, 1);
  gMeme.selectedLineIdx = 0;
}

function setTxtAlign(align, pose) {
  //add check for line location on canvas
  gMeme.lines[gMeme.selectedLineIdx].align = align;
  gMeme.lines[gMeme.selectedLineIdx].x = pose;
}

function setFontSize(diff) {
  //add check for line location on canvas
  if (
    gMeme.lines[gMeme.selectedLineIdx].size + diff > 80 ||
    gMeme.lines[gMeme.selectedLineIdx].size + diff < 20
  )
    return;
  gMeme.lines[gMeme.selectedLineIdx].size += diff;
}

function setColor(isStroke, color) {
  //add check for line location on canvas
  isStroke
    ? (gMeme.lines[gMeme.selectedLineIdx].stroke = color)
    : (gMeme.lines[gMeme.selectedLineIdx].fill = color);
}

function addEmoji(emoji, canvas) {
  gMeme.lines.push({
    txt: emoji,
    size: 50,
    align: 'center',
    // height: 50,
    y: canvas.height / 2,
    x: canvas.width / 2,
  });
}

function changeFontFamily(fontFamily) {
  gMeme.lines[gMeme.selectedLineIdx].font = fontFamily;
}

//imgs gallery //
function getImgs() {
  return gImgs;
}

function _createImgs() {
  var imgs = loadFromStorage(KEY);
  if (!imgs || !imgs.length) {
    var imgs = [];
    for (var i = 0; i < 18; i++) {
      imgs.push(_createImg(i + 1));
    }
    saveToStorage(KEY, imgs);
  }
  return imgs;
}

function _createImg(id) {
  return {
    id,
    url: `img/meme-imgs (square)/${id}.jpg`,
  };
}

function getImgById(id) {
  return gImgs.find((img) => img.id === id);
}
