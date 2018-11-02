import { memory } from 'game-of-life/game_of_life_bg';
import { Universe } from 'game-of-life';
import fps from './fps';
import './utils';

const SIZE = 128;

const CELL_SIZE = 5;
const CELL_COLOR = '#000';

// Construct the universe, and get its width and height.
let universe = Universe.new(SIZE, SIZE);
const width = universe.width();
const height = universe.height();

// Give the canvas room for all of our cells and a 1px border
// around each of them.
const canvas = document.getElementById('game-of-life-canvas');
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

const ctx = canvas.getContext('2d');

// Adjust the speed
const tickRange = document.getElementById('tick-range');
let interval = 1000 / tickRange.value;
let then = Date.now();

tickRange.addEventListener('input', event => {
  interval = 1000 / event.target.value;
});

let animationId = null;

const renderLoop = () => {
  animationId = requestAnimationFrame(renderLoop);

  const now = Date.now();
  const delta = now - then;
  if (delta < interval) return;
  then = now - (delta % interval);
  fps.render();

  universe.tick();

  drawCells();
};

// Play and pause simulation
const playPauseButton = document.getElementById('play-pause');

const play = () => {
  playPauseButton.textContent = playPauseButton.dataset.pause;
  renderLoop();
};

const pause = () => {
  playPauseButton.textContent = playPauseButton.dataset.play;
  cancelAnimationFrame(animationId);
  animationId = null;
};

playPauseButton.addEventListener('click', _ => {
  if (isPaused()) {
    play();
  } else {
    pause();
  }
});

const isPaused = () => animationId === null;

// Reset simulation
const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => {
  universe = Universe.new(SIZE, SIZE);
  drawCells();
});

// Blank canvas
const blankButton = document.getElementById('blank');
blankButton.addEventListener('click', () => {
  universe.clear_cells();
  drawCells();
});

const getIndex = (row, column) => {
  return row * width + column;
};

const drawCells = () => {
  const cellsPtr = universe.cells();
  const cells = new Uint8Array(memory.buffer, cellsPtr, (width * height) / 8);

  ctx.clear();
  ctx.beginPath();

  ctx.fillStyle = CELL_COLOR;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col);
      if (!bitOfArray(cells, idx)) {
        continue;
      }

      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }

  ctx.stroke();
};

const bitOfArray = (array, index) => {
  const mask = 1 << index % 8;
  return (array[Math.floor(index / 8)] & mask) == mask;
};

canvas.addEventListener('click', event => {
  const boundingRect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / boundingRect.width;
  const scaleY = canvas.height / boundingRect.height;

  const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
  const canvasTop = (event.clientY - boundingRect.top) * scaleY;

  const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
  const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

  switch (true) {
    case event.shiftKey:
      universe.create_pulsar();
      break;
    case event.ctrlKey:
      universe.create_glider();
      break;
    default:
      universe.toggle_cell(row, col);
  }

  drawCells();
});

play();
