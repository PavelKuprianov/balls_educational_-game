const canv = document.getElementById('crown');
canv.width = window.innerWidth / 3 * 2 //ширина игрового поля
canv.height = window.innerHeight // высота игрового поля
const ctx = canv.getContext('2d')

function randomColor() {
  return Math.floor(Math.random() * (256 - 0 + 1) + 0)
}

//Запуск игры
const btnStart = document.getElementById('btnStart')
const radio = document.querySelectorAll('.radio')

btnStart.addEventListener('click', () => {
  let optionColor
  radio.forEach((elem => { //Перебираем радиокнопки для определения активной
    if (elem.checked) {
      optionColor = elem.id
    }
  }))
  startGame(optionColor)
})

let time = 0
let timeFirst = 0
let timeEnd = 0
let firstColor, secondColor, thirdColor

function startGame(optionColor) {

  function addArc(x, y, time) {



    if (optionColor === 'random') {
      firstColor = randomColor()
      secondColor = randomColor()
      thirdColor = randomColor()
    } else {
      console.log(optionColor);
    }


    for (let i = 0; i < time; i++) {
      setTimeout(() => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${firstColor}, ${secondColor}, ${thirdColor}, 0.5)`;
        ctx.arc(x, y, i, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${firstColor}, ${secondColor}, ${thirdColor}, 0.5)`;
        ctx.fill();
        ctx.stroke();
      }, (i * 30))
    }

    setTimeout(() => {
      // ctx.moveTo(x, y);
      const grd = ctx.createRadialGradient(x, y, 0, x, y, time);
      ctx.beginPath();
      grd.addColorStop(0, 'rgba(222, 222, 222, 1)');
      grd.addColorStop(0.4, 'rgba(222, 222, 222, 0.8)');
      grd.addColorStop(0.6, 'rgba(222, 222, 222, 0.6)');
      grd.addColorStop(0.8, 'rgba(222, 222, 222, 0.4)');
      grd.addColorStop(1, 'rgba(222, 222, 222, 0.3)');

      ctx.arc(x, y, time, 0, Math.PI * 2)
      ctx.fillStyle = grd;
      ctx.moveTo(x, y);
      ctx.fill();
      ctx.closePath();
    }, (time * 30 + 0.1))


  }

  canv.addEventListener('mousedown', () => {
    timeFirst = new Date()


  })

  canv.addEventListener('click', (event) => {
    timeEnd = new Date()
    time = (timeEnd - timeFirst) / 10
    if (time > 200) { //Устанавливаем ограничения в 200 пикселей на размер шарика
      time = 200
    }

    const x = event.pageX
    const y = event.pageY
    addArc(x, y, time)
  })

}





