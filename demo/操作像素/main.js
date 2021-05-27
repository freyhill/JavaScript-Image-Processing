var img = new Image();
img.crossOrigin = 'anonymous';
img.src = './test.jpg'

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var hoverColor = document.getElementById('hover-color')
// 图片加载完成后使用drawImage画到画布上面
img.onload = function() {
  canvas.width = img.width
  canvas.height = img.height
  ctx.drawImage(img, 0, 0, img.width, img.height);
}

// 显示某个像素点的rgba
function pick(event, destination) {
  var x = event.layerX;
  var y = event.layerY;
  // ctx.getImageData可以拿到
  var pixel = ctx.getImageData(x, y, 2, 2);
  var data = pixel.data;
  console.log(data);
  var pixelData = {
    red: data[0], // 红色通道的值
    green: data[1], // 绿色通道的值
    blue: data[2], // 蓝色通道的值 
    alpha: data[3] / 255 // 透明度
  }
  const {red, green, blue, alpha} = pixelData;
  var rgba = `rgba(${red}, ${green},${blue},${alpha})`;
  destination.style.background = rgba;
  destination.textContent = rgba;
  return rgba;
}

canvas.addEventListener('mousemove', function(event) {
  pick(event, hoverColor)
})