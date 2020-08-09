const table = document.getElementById('gridTable'),
  cells = document.getElementsByTagName('td'),
  timer = document.getElementById('timer'),
  result = document.getElementById('result');

let answers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
clickedCells = [],
interval,
started = false,
time = 0,
ready = true,
numCompleted = 0;

// Random sorting of arrays answers

const setRandomAnswers = (arr) => {
  arr.sort(() => Math.random() - .5);
  return arr;
};

// Set cells values and attributes

const setCellAttributes = (list) => {
  for (let i = 0; i < list.length; i++) {
    let cell = list[i];
    cell.completed = false;
    cell.clicked = false;
    cell.value = answers[i];
    cell.addEventListener('click', () => cellHandler(cell));
  }
};

// Display cell value

const displayCellValue = (cell) => {
  cell.style.background = '#eee';
  cell.innerText = cell.value;
  cell.clicked = true;
};

// Hide cell value

const hideCellValue = (cell) => {
  cell.style.background = '#242B3D url(img/question.svg) no-repeat center';
  cell.style.backgroundSize = '40%';
  cell.innerText = '';
  cell.clicked = false;
};

// Display completed cell

const displayCompletedCell = (cell) => {
  cell.style.background = '#00CC00';
  cell.style.cursor = 'default';
  cell.completed = true;
  numCompleted++;
};

// Start timer when first cell clicked

const startTimer = () => {
  if (started === false) {
    interval = setInterval(() => {
      time++;
      timer.innerHTML = time;
    }, 1000);

    started = true;
  }
};

// Handler of click event for cell

const cellHandler = (cell) => {
  if (ready === false) return;
  if (cell.clicked === false && cell.completed === false) {
    startTimer();
    displayCellValue(cell);
    clickedCells.push(cell);

    // we have only 2 clicks to try match cells
    if (clickedCells.length === 2) {

      // if we have a matching pair
      if (clickedCells[0].value === clickedCells[1].value) {
        displayCompletedCell(clickedCells[0]);
        displayCompletedCell(clickedCells[1]);
        clickedCells = [];

        // check if we find all match pairs
        if (numCompleted === answers.length) {
          clearInterval(interval);
          result.innerHTML = `You won in ${time} seconds`;
        }
      } else {

        //if we haven't a matching pair
        ready = false;
        table.style.borderColor = 'red';

        setTimeout(function() {
          hideCellValue(clickedCells[0]);
          hideCellValue(clickedCells[1]);
          clickedCells = [];
          table.style.borderColor = 'transparent';
          ready = true;
        }, 500);
      }
    }
  }
};

// Restart game

document.getElementById('restart').addEventListener('click', () => location.reload());

// Init game

const initGame = () => {
  setRandomAnswers(answers);
  setCellAttributes(cells);
};

initGame();


