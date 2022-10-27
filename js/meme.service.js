'use strict';

var gMeme;
const KEY = 'imgDB';
var gImgs = _createImgs();

function getMeme() {}

function createMeme(id, url, num = 0) {
  gMeme = {
    selectedImgId: id,
    selectedImgurl: url,
    selectedLineIdx: num,
    lines: [],
  };
}

function returnLines() {
  return gMeme.lines;
}

function createTxt(index, txt, width) {
  isThereLine(index);
  gMeme.lines[index].txt = txt;
  gMeme.lines[index].width = width;
}

function isThereLine(index) {
  if (!gMeme.lines[index]) {
    createLines(index);
    if (index === 1) gMeme.lines[index].height = gMaxHeight - 10;
  }
}

function createLines(index) {
  gMeme.lines[index] = {
    txt: null,
    size: 30,
    align: 'center',
    height: 30,
    stroke: '#000',
    fill: '#fff',
  };
}

function removeLineFromMeme(index) {
  if (gMeme.lines.length === 0) return;
  gMeme.lines[index] = null;
}

function setTxtAlign(index, align, width) {
  isThereLine(index);
  gMeme.lines[index].align = align;
  gMeme.lines[index].width = width;
}

function setFontSize(isBigger, index) {
  isThereLine(index);
  if (isBigger) {
    if (gMeme.lines[index].size + 10 > 80) return;
    gMeme.lines[index].size += 10;
    gMeme.lines[index].height += 10;
  } else {
    if (gMeme.lines[index].size - 10 < 30) return;
    gMeme.lines[index].size -= 10;
    gMeme.lines[index].height -= 10;
  }
}

function setColor(index, isStroke, color) {
  isThereLine(index);
  isStroke
    ? (gMeme.lines[index].stroke = color)
    : (gMeme.lines[index].fill = color);
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
