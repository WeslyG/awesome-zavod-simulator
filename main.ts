import './main.css';
import { delay } from './utils';

type Position = { x: number; y: number };

const state: Position[] = [];
const DEBUG = false;

const addPathPoint = (e: MouseEvent) => {
  if (DEBUG) {
    console.log('===========');
    console.log(`x = ${e.clientX}`);
    console.log(`y = ${e.clientY}`);
    console.log('===========');
  }
  state.push({
    x: e.clientX,
    y: e.clientY,
  });
};

const printLine = (e: MouseEvent, ctx: CanvasRenderingContext2D) => {
  ctx.lineTo(e.clientX, e.clientY);
  ctx.stroke();
};

function main() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  canvas.addEventListener('mousedown', (e) => {
    addPathPoint(e);
    printLine(e, ctx);
  });
}

main();
