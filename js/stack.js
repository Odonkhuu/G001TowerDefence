
(function(){
  const canvas = document.getElementById('logoCanvas');
  const ctx = canvas.getContext('2d');

  // 1) High-DPI scale (crisp on Retina)
  const DPR = Math.max(1, Math.floor(window.devicePixelRatio || 1));
  const CSS_W = canvas.width, CSS_H = canvas.height;
  canvas.width  = CSS_W * DPR;
  canvas.height = CSS_H * DPR;
  canvas.style.width  = CSS_W + 'px';
  canvas.style.height = CSS_H + 'px';
  ctx.scale(DPR, DPR);

  // 2) Logo эх сурвалжууд
  const sources = [
    'img/html.jpg',
    'img/css.jpg',
    'img/js.jpg',
    'img/tiled.jpg'
  ];

  // 3) Зургийг ачаалах
  function loadImage(src){
    return new Promise((resolve, reject)=>{
      const im = new Image();
      im.onload = () => resolve(im);
      im.onerror = reject;
      im.src = src;
    });
  }

  Promise.all(sources.map(loadImage)).then(images=>{
    // 4) Спрайтууд бэлтгэх
    const size = 76;          // дугуйны диаметр — "жаахан томруулсан"
    const gap  = 50;          // логонуудын хоорондын зай
    const speed = 2;          // нийт урсах хурд (px/frame)
    const totalStride = (size + gap) * images.length;

    // Y-г төвд тааруулах
    const y = (CSS_H - size) / 2;

    // Эхний X байрлалууд (зүүнээс баруун руу жигд завсартайгаар гаргаж ирнэ)
    const sprites = images.map((img, i) => ({
      img,
      x: - (size + gap) * (images.length - i), // бүгд canvas-ийн зүүнээс бага багаар орж ирнэ
      y,
    }));

    // 5) Дугуй масктай зурж өгөх helper (cover тайлбарласан)
    function drawRoundedImage(ctx, img, x, y, size, radius = size/2){
      ctx.save();
      // дугуй маск
      ctx.beginPath();
      ctx.arc(x + size/2, y + size/2, radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      // "cover"-оор зүсэх (зургийн харьцаа хадгалж, квадрат дүүргэнэ)
      const iw = img.naturalWidth, ih = img.naturalHeight;
      const scale = Math.max(size / iw, size / ih);
      const sw = iw * scale, sh = ih * scale;
      const sx = x + (size - sw) / 2;
      const sy = y + (size - sh) / 2;

      // зургийг зурна
      ctx.drawImage(img, sx, sy, sw, sh);

      ctx.restore();

      // хүрээ + сүүдэр (сонголт)
      ctx.save();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(255,255,255,0.65)';
      ctx.beginPath();
      ctx.arc(x + size/2, y + size/2, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // 6) Анимэйшн
    function tick(){
      // арын фон
      ctx.clearRect(0, 0, CSS_W, CSS_H);

      sprites.forEach(s => {
        drawRoundedImage(ctx, s.img, s.x, s.y, size);

        // баруун тийш урсгана
        s.x += speed;

        // баруун талаас бүрэн гармагц, бүх цувааны уртыг хасч зүүнээс дахин оруулна
        if (s.x > CSS_W) {
          s.x -= totalStride + CSS_W; // spacing тогтвортой байлгахын тулд томоор ухаргана
        }
      });

      requestAnimationFrame(tick);
    }

    tick();
  }).catch(err=>{
    console.error('Logo images failed to load:', err);
  });
})();