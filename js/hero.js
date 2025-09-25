(function(){
    const canvas = document.getElementById('heroCanvas');
    if(!canvas) return;
    const c = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    let t = 0;
    function loop(){
      requestAnimationFrame(loop);
      t += 0.02;
      // background
      c.fillStyle = '#05070a';
      c.fillRect(0,0,W,H);
      // grid
      c.strokeStyle = 'rgba(255,211,77,0.08)';
      c.lineWidth = 1;
      for(let x=0; x<W; x+=20){
        c.beginPath(); c.moveTo(x,0); c.lineTo(x,H); c.stroke();
      }
      for(let y=0; y<H; y+=20){
        c.beginPath(); c.moveTo(0,y); c.lineTo(W,y); c.stroke();
      }
      // pulsating coin
      const cx = 80 + Math.sin(t)*10, cy = 80;
      const r = 28 + Math.sin(t*2)*2;
      c.save();
      const grd = c.createRadialGradient(cx-5, cy-8, r*0.2, cx, cy, r);
      grd.addColorStop(0, '#FFE27A');
      grd.addColorStop(0.55, '#FFC938');
      grd.addColorStop(1, '#D39B00');
      c.fillStyle = grd;
      c.beginPath(); c.arc(cx, cy, r, 0, Math.PI*2); c.fill();
      c.strokeStyle = '#A87400'; c.lineWidth = 4; c.stroke();
      c.restore();
  
      // label
      c.fillStyle = 'rgba(255,255,255,0.7)';
      c.font = 'bold 14px system-ui, sans-serif';
      c.fillText('HTML5 Canvas • Tower Defense', 16, H-18);
    }
    loop();
  })();