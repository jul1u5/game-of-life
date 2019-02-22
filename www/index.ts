import { memory } from '../pkg/game_of_life_bg';
import { Universe } from '../pkg/game_of_life';

const SIZE = 128;

const CELL_SIZE = 5;
const CELL_COLOR = '#000';

let universe = new Universe(SIZE, SIZE);
const width = universe.width();
const height = universe.height();

const canvas = document.getElementById('game-of-life-canvas') as HTMLCanvasElement;
canvas.width = (CELL_SIZE + 1) * width + 1;
canvas.height = (CELL_SIZE + 1) * height + 1;

const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

let paused = false;

const main = (frame: number = 0) => {
  requestAnimationFrame(main);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!paused) universe.tick();

  drawCells();
};

const playPauseButton = document.getElementById('play-pause') as HTMLButtonElement;

const play = () => {
  playPauseButton.textContent = playPauseButton.dataset.pause as string;
  paused = false;
};

const pause = () => {
  playPauseButton.textContent = playPauseButton.dataset.play as string;
  paused = true;
};

playPauseButton.addEventListener('click', _ => paused
  ? play()
  : pause()
);

const resetButton = document.getElementById('reset') as HTMLButtonElement;
resetButton.addEventListener('click', () => {
  universe = new Universe(SIZE, SIZE);
});

const blankButton = document.getElementById('blank') as HTMLButtonElement;
blankButton.addEventListener('click', () => {
  universe.clear_cells();
});

const getIndex = (row: number, column: number) => {
  return row * width + column;
};

const drawCells = () => {
  const cellsPtr = universe.cells();
  const cells = new Uint8Array(memory.buffer, cellsPtr, (width * height) / 8);

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

const bitOfArray = (array: Uint8Array, index: number) => {
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

  universe.toggle_cell(row, col);
});

main();
play();
