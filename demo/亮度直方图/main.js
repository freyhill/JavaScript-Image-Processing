var img = new Image();
img.crossOrigin = 'anonymous';
img.src = './test.jpg'

var canvas = document.getElementById('canvas');
var putCanvas = document.getElementById('put-canvas')
var ctx = canvas.getContext('2d');
var putCtx = putCanvas.getContext('2d');

var histogramWrapperHeight = 300;
var brightnessMap = {}
var maxBrightNessNumber = 0; // 存储某个亮度的最大值
var histogramRate = 0;

// 图片加载完成后使用drawImage画到画布上面
img.onload = function() {
  canvas.width = putCanvas.width = img.width;
  canvas.height =  putCanvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);

  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  changeBrightness(imageData, 10);
  histogramRender();
}

// 获取亮度
function changeBrightness(imageData, value) {
    var data = imageData.data;
    console.log(data);
    // 0.299*R + 0.587*G + 0.114*B
    for(var i = 0; i< data.length; i += 4) {
        var redBright = data[i] * 0.299;
        var greenBright = data[i + 1] * 0.587;
        var blueBright = data[i + 2] * 0.114;
        var pixelbrightNess = Math.floor(redBright + greenBright + blueBright);
        if (brightnessMap[pixelbrightNess]) {
            brightnessMap[pixelbrightNess] = brightnessMap[pixelbrightNess] + 1;
        } else {
            brightnessMap[pixelbrightNess] = 1;
        }
        maxBrightNessNumber = Math.max(maxBrightNessNumber, brightnessMap[pixelbrightNess] );
    }
    histogramRate = histogramWrapperHeight / maxBrightNessNumber;
    putCtx.putImageData(imageData, 0, 0);
}

// 亮度直方图
function  histogramRender() {
    var length = 256;
    var dom = `<ul>`;
    for(var i = 0; i < length; i++) {
        var height = brightnessMap[i] ? brightnessMap[i] * histogramRate : 0;
        dom += `<li style='height:${height}px'></li>`;
    }
    dom += `</ul>`
    document.getElementById('histogram').innerHTML = dom;
}