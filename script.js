const canv = document.getElementById('crown');
console.log('canv: ', canv);
canv.width = window.innerWidth
canv.height = window.innerHeight
const ctx = canv.getContext('2d')

let time = 90
function addArc(x, y, time) {


  for (let i = 0; i < time; i++) {
    setTimeout(() => {
      ctx.moveTo(x, y);

      ctx.arc(x, y, i, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(243, 22, 22, 0.2)';
      ctx.stroke()
    }, (i * 30))
  }

  setTimeout(() => {
    const grd = ctx.createRadialGradient(x, y, 0, x, y, time);
    grd.addColorStop(0, 'rgba(222, 222, 222, 1)');
    grd.addColorStop(0.5, 'rgba(222, 222, 222, 0.7)');
    grd.addColorStop(0.8, 'rgba(222, 222, 222, 0.4)');
    grd.addColorStop(1, 'rgba(219, 15, 15, 0.7)');
    ctx.beginPath();
    // ctx.moveTo(x, y);

    ctx.arc(x, y, time, 0, Math.PI * 2)
    ctx.fillStyle = grd;
    ctx.fill();
  }, (time * 30))
}

canv.addEventListener('click', (event) => {
  const x = event.pageX
  const y = event.pageY
  addArc(x, y, time)
})





