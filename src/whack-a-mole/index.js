import './style.css';

const DEFAULT_SIZE = 3;
const DEFAULT_MINUTES = 2;
const DEFAULT_SECONDS = 0;
const DEFAULT_PAUSE = 1000;
const STATES = {
  ON: 'on',
  OFF: 'off',
};

let state = STATES.OFF;
let currentScore = 0;

const field = document.getElementById('field');
field.append(createField());

const actionButton = document.getElementById('start');
actionButton.addEventListener('click', startGame);

const timer = document.getElementById('timer');
const score = document.getElementById('score');

function createField(rows = DEFAULT_SIZE, cols = DEFAULT_SIZE) {
  const fragment = document.createDocumentFragment();
  for (let row = 0; row < rows; row++) {
    const rowDiv = createRow();
    for (let col = 0; col < cols; col++) {
      const cellDiv = createCell(row, col);
      rowDiv.append(cellDiv);
    }
    fragment.append(rowDiv);
  }
  return fragment;
}

function createRow() {
  const row = document.createElement('div');
  row.classList.add('field__row');
  return row;
}

function createCell(row, col) {
  const cell = document.createElement('div');
  cell.classList.add('field__cell');
  cell.dataset.index = `${row}-${col}`;
  return cell;
}

function startGame() {
  state = STATES.ON;
  actionButton.classList.add('hidden');
  timer.classList.remove('hidden');
  score.classList.remove('hidden');
  field.addEventListener('click', updateScore);
  updateTimer();
  updateMole();
}

function stopGame() {
  state = STATES.OFF;
  actionButton.classList.remove('hidden');
  timer.classList.add('hidden');
  //hideMole();
}

function updateTimer(minutes = DEFAULT_MINUTES, seconds = DEFAULT_SECONDS) {
  const timerId = setTimeout(() => {
    const rest = minutes * 60 + seconds - 1;
    if (rest >= 0) {
      minutes = Math.floor(rest / 60);
      seconds = rest - minutes * 60;
      timer.textContent = `${timeFormat(minutes)}:${timeFormat(seconds)}`;
      updateTimer(minutes, seconds);
    } else {
      clearTimeout(timerId);
      stopGame();
    }
  }, 1000);
}

function timeFormat(value) {
  return String(value).padStart(2, '0');
}

function updateMole(
  rows = DEFAULT_SIZE,
  cols = DEFAULT_SIZE,
  pause = DEFAULT_PAUSE
) {
  const timerId = setTimeout(() => {
    if (state == STATES.ON) {
      let current = document.querySelector('.field__cell.active');
      if (current) {
        current.classList.remove('active', 'blocked');
      }
      const rowIndex = Math.floor(Math.random() * rows);
      const colIndex = Math.floor(Math.random() * cols);
      current = document.querySelector(
        `[data-index="${rowIndex}-${colIndex}"]`
      );
      current.classList.add('active');
      updateMole();
    } else {
      clearInterval(timerId);
    }
  }, pause);
}

function updateScore(event) {
  const cell = event.target;
  if (
    cell.classList.contains('active') &&
    !cell.classList.contains('blocked')
  ) {
    currentScore += 1;
    score.textContent = `Score: ${currentScore}`;
    cell.classList.add('blocked');
  }
}
