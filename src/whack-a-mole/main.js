const DEFAULT_SIZE = 3;
const DEFAULT_TIME = 15;
const STATES = {
  ON: 'on',
  OFF: 'off',
};

let currentState = STATES.OFF;
let currentScore = 0;
let currentSize = DEFAULT_SIZE ** 2;

const field = document.getElementById('field');
const start = document.getElementById('start');
const timer = document.getElementById('timer');
const score = document.getElementById('score');

field.append(createField());
field.addEventListener('click', updateScore);
start.addEventListener('click', startGame);

resetGame();

function createField(rows = DEFAULT_SIZE, cols = DEFAULT_SIZE) {
  const fragment = document.createDocumentFragment();
  for (let row = 0; row < rows; row++) {
    const rowDiv = createRow();
    for (let col = 0; col < cols; col++) {
      const cellDiv = createCell(row * cols + col);
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

function createCell(index) {
  const cell = document.createElement('div');
  cell.classList.add('field__cell');
  cell.dataset.index = index;
  return cell;
}

function startGame() {
  hideElement(start);
  showElement(timer);
  showElement(score, 'Score: 0');

  currentState = STATES.ON;
  currentScore = 0;

  startTimer();
  startInvasion();
}

function finishGame() {
  showElement(start);
  hideElement(timer);
  clearField();

  currentState = STATES.OFF;
}

function resetGame() {
  showElement(start);
  hideElement(timer);
  hideElement(score);
}

function startTimer(time = DEFAULT_TIME) {
  if (time >= 0) {
    timer.textContent = formatTime(time);
    setTimeout(() => startTimer(--time), 1000);
  } else {
    finishGame();
  }
}

function startInvasion() {
  const prevEl = document.querySelector('.field__cell.active');
  prevEl?.classList?.remove('active', 'blocked');

  if (currentState === STATES.OFF) return;

  const prevIndex = prevEl?.dataset?.index;
  const nextIndex = generatePosition(currentSize, prevIndex);

  const current = document.querySelector(`[data-index="${nextIndex}"]`);
  current.classList.add('active');

  setTimeout(() => startInvasion(currentSize), generatePause());
}

function updateScore(event) {
  if (currentState === STATES.OFF) return;

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

function clearField() {
  document
    .querySelector('.field__cell.active')
    ?.classList.remove('active', 'blocked');
}

function showElement(element, text) {
  element.classList.remove('!hidden');
  if (text) element.textContent = text;
}

function hideElement(element) {
  element.classList.add('!hidden');
}

function formatTime(time) {
  const minutes = String(Math.floor(time / 60)).padStart(2, '0');
  const seconds = String(time - minutes * 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function generatePosition(max, prev) {
  const random = Math.floor(Math.random() * max);
  return random === parseInt(prev) ? generatePosition(max, prev) : random;
}

function generatePause() {
  return 400 + Math.random() * 500;
}
