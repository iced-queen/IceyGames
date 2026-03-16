(function () {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles;

  const SNOWFLAKE_SHAPES = ['❄', '✦', '·', '⋆'];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createParticle() {
    return {
      x:       rand(0, W),
      y:       rand(-20, H),
      size:    rand(8, 18),
      speed:   rand(0.3, 0.9),
      opacity: rand(0.08, 0.35),
      drift:   rand(-0.25, 0.25),
      shape:   SNOWFLAKE_SHAPES[Math.floor(Math.random() * SNOWFLAKE_SHAPES.length)],
      spin:    rand(-0.008, 0.008),
      angle:   rand(0, Math.PI * 2),
    };
  }

  function init() {
    resize();
    const count = Math.floor(W / 22);
    particles = Array.from({ length: count }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (const p of particles) {
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.font = `${p.size}px serif`;
      ctx.fillStyle = '#a8e6ff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.shape, 0, 0);
      ctx.restore();

      p.y += p.speed;
      p.x += p.drift;
      p.angle += p.spin;

      if (p.y > H + 20 || p.x < -20 || p.x > W + 20) {
        p.x = rand(0, W);
        p.y = -20;
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  init();
  draw();
})();
