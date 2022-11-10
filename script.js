const canv = document.getElementById('crown');
const canvContainer = document.querySelector('.canvas');
canv.width = window.innerWidth / 3 * 2 //ширина игрового поля
canv.height = window.innerHeight // высота игрового поля
const ctx = canv.getContext('2d');

const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');
const btnClear = document.getElementById('btnClear');
const radio = document.querySelectorAll('.radio');
const radioSpeed = document.querySelectorAll('.radioSpeed');
const checkboxes = document.querySelectorAll('.checkbox');
const interactive = document.querySelectorAll('.interactive'); //Вводим переменную для поиска всех интерактивных элементов, 
//чтобы заблокировать их на время игры. Блокировку осуществляем через disable, вешая его после клика на кнопку "Начать игру"

// Очистка игрового поля
btnClear.addEventListener('click', () => {
  ctx.clearRect(0, 0, canv.width, canv.height);
})

btnStop.addEventListener('click', () => {
  window.location.reload();
})


//Логика блокировки чекбоксов выбора фиксированного цвета
radio.forEach((element) => {
  element.addEventListener('click', (event) => {
    if (event.target.id === 'fix') {
      checkboxes.forEach((checkbox) => {
        checkbox.disabled = false;
      })
    } else {
      checkboxes.forEach((checkbox) => {
        checkbox.disabled = true;
      })
    }
  })
})

//Функция генерирования случайных чисел в диапазоне [0 ; 256] для формирования цвета
function randomColor() {
  return Math.floor(Math.random() * (256 - 0 + 1) + 0)
}

let colors = [];
let speed;

//Запуск игры
btnStart.addEventListener('click', () => {
  canvContainer.classList.remove('canvas');
  interactive.forEach((e) => {
    e.disabled = true;
  })
  btnStart.style.display = 'none';
  btnStop.style.display = 'block';
  btnClear.style.display = 'block';

  let optionColor
  radio.forEach((elem => { //Перебираем радиокнопки для определения активной
    if (elem.checked) {
      optionColor = elem.id
      if (optionColor === 'fix') {
        checkboxes.forEach((checkbox) => {
          if (checkbox.checked) {
            colors.push(checkbox);
          }
        })
      }
    }
  }))
  radioSpeed.forEach((el) => {
    if (el.checked) {
      if (el.id === 'max') {
        speed = 5;
      } else {
        if (el.id === 'normal') {
          speed = 30;
        } else {
          speed = 100;
        }
      }
    }
  })
  startGame(optionColor, colors, speed)
})

let time = 0
let timeFirst = 0
let timeEnd = 0
let firstColor, secondColor, thirdColor
const data = {
  redColor: { firstColor: 248, secondColor: 7, thirdColor: 7 },
  greenColor: { firstColor: 26, secondColor: 105, thirdColor: 6 },
  blueColor: { firstColor: 6, secondColor: 26, thirdColor: 105 }
}

//Функция выбора цвета при его фиксированных значениях
function addColors(colors) {

  let index = Math.floor(Math.random() * (colors.length - 0) + 0);

  if (colors.length === 0) {
    alert('Вы не выбрали цвет!');
    return
  }

  if (colors[index].id === 'red') {
    return (firstColor = data.redColor.firstColor,
      secondColor = data.redColor.secondColor,
      thirdColor = data.redColor.thirdColor
    )
  } else {
    if (colors[index].id === 'green') {
      return (firstColor = data.greenColor.firstColor,
        secondColor = data.greenColor.secondColor,
        thirdColor = data.greenColor.thirdColor
      )
    } else {
      return (firstColor = data.blueColor.firstColor,
        secondColor = data.blueColor.secondColor,
        thirdColor = data.blueColor.thirdColor
      )
    }
  }
}

function startGame(optionColor, colors, speed) {

  function addArc(x, y, time) {
    console.log(optionColor);
    if (optionColor !== 'random') {
      addColors(colors);

    } else {
      firstColor = randomColor()
      secondColor = randomColor()
      thirdColor = randomColor()
    }

    for (let i = 0; i < time; i++) {
      setTimeout(() => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${firstColor}, ${secondColor}, ${thirdColor}, 0)`;
        ctx.arc(x, y, i, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${firstColor}, ${secondColor}, ${thirdColor}, 0.1)`;
        ctx.fill();
        ctx.stroke();
      }, (i * speed))
    }

    setTimeout(() => {
      ctx.moveTo(x, y);
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
    }, (time * speed + 0.1))

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





