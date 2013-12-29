var Collage = Collage || {};

Collage.begin = function() {
  Collage.canvas = document.getElementById('container');
  Collage.context = Collage.canvas.getContext('2d');
  Collage.context.fillStyle = 'white';
  Collage.context.fillRect(0,0, Collage.canvas.width, Collage.canvas.height);
  Collage.drawtools = document.getElementsByClassName('drawtool');
  Collage.scaleButton = document.getElementById('scale-button');
  Collage.scaleInput = document.getElementById('scale-input');
  Collage.uploadButton = document.getElementById('upload-button');
  Collage.uploadInput = document.getElementById('upload-input');
  Collage.exportButton = document.getElementById('export-button');
  Collage.menu = document.getElementById('menu');
  // Collage.imageWidth = '30';
  // Collage.imageHeight = '23';
  Collage.scale = 1;
  Collage.mousedown = false;
  // Collage.context.scale(0.5, 0.5);
};

Collage.draw = function(e) {
  // console.log("here");
  if( typeof Collage.currentImage !== "undefined") {
    var mousePos = Collage.getMousePos(e);
  // Collage.context.drawImage(Collage.currentImage, mousePos.x - (Collage.currentImage.width / 2 ), mousePos.y - (Collage.currentImage.height/ 2 ), Collage.imageWidth, Collage.imageHeight);
  Collage.context.drawImage(Collage.currentImage, mousePos.x - (Collage.currentImage.width / 4 ), mousePos.y - (Collage.currentImage.height/ 4 ), (Collage.currentImage.width / 2) * Collage.scale, (Collage.currentImage.height / 2) * Collage.scale);

  Collage.mousedown = true;
}
};

Collage.getMousePos = function(e) {
  // console.log("also here");
  var rect = Collage.canvas.getBoundingClientRect();
  // debugger;
  return {
    x: ((e.clientX - rect.left)/(rect.right-rect.left)) * Collage.canvas.width,
    y: ((e.clientY-rect.top)/(rect.bottom-rect.top)) * Collage.canvas.height
  };
};

Collage.drag = function(e) {
  if( Collage.mousedown ) {
    var mousePos = Collage.getMousePos(e);
    Collage.context.drawImage(Collage.currentImage, mousePos.x - (Collage.currentImage.width / 4 ), mousePos.y - (Collage.currentImage.height/ 4 ), (Collage.currentImage.width / 2)* Collage.scale, (Collage.currentImage.height / 2) * Collage.scale);
  }
};

Collage.mouseup = function(e) {
  Collage.mousedown = false;
};

// Collage.setCurrentImage = function(e) {
//   // console.log(this);
//   Collage.currentImage = this;
// var currentDisplay = document.getElementById('currentimage');
// currentDisplay.src = this.src;

// };

Collage.setCurrentImage = function() {
  var source = this.src;
  var URL = this.src;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/convert?image_url=" + URL, true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      var imgSrc = "data:image/png;base64, " + xhr.responseText;
      var newImg = document.createElement('img');
      newImg.src = imgSrc;
      Collage.currentImage = newImg;
      var currentDisplay = document.getElementById('currentimage');
      currentDisplay.src = source;
    }
  };
};

// Collage.setCurrentImage = function(e) {
//   var converted = btoa(this.src);
//   var currentDisplay = document.getElementById('currentimage');
//   currentDisplay.src = this.src;
//   var imgSrc = "data:image/png;base64, " + converted;
//   var newImg = document.createElement('img');
//   newImg.src = imgSrc;
//   Collage.currentImage = newImg;
//   // debugger;
//   // console.log(converted);

// };

Collage.setScale = function(e) {
  var newScale = parseInt(Collage.scaleInput.value, 10);
  if(!isNaN(newScale)) {
    Collage.scale = newScale;
    Collage.scaleInput.value = "";
  }
};

Collage.upload = function(e) {
  var newImg = new Image();
  newImg.onload = function() {
    newImg.className = "drawtool";
    newImg.addEventListener("click", Collage.setCurrentImage);
    Collage.menu.appendChild(newImg);
  };
  newImg.onerror = function() {
    var error = document.getElementById('error');
    error.style.display = "block";
  };
  newImg.src = Collage.uploadInput.value;
};

Collage.exportPicture = function(e) {
  var url = Collage.canvas.toDataURL();
  var link = document.createElement('a');
  link.href = url;
  link.download = 'SickCollageFooly.png';
  var click = document.createEvent('Event');
  click.initEvent('click', true, true);
  link.dispatchEvent(click);
};

window.onload = function() {

  Collage.begin();
  Collage.canvas.addEventListener("mousedown", Collage.draw);
  Collage.canvas.addEventListener("mousemove", Collage.drag);
  Collage.canvas.addEventListener("mouseup", Collage.mouseup);
  for( i = 0; i < Collage.drawtools.length; i ++ ) {
    Collage.drawtools[i].addEventListener("click", Collage.setCurrentImage);
  }
  Collage.scaleButton.addEventListener("click", Collage.setScale);
  Collage.uploadButton.addEventListener("click", Collage.upload);
  Collage.exportButton.addEventListener("click", Collage.exportPicture);

};