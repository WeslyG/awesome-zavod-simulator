import './main.css';
import { z } from './another';

const logMouseEvent = (e: MouseEvent) => {
  console.log('===========');
  console.log(`x = ${e.clientX}`);
  console.log(`y = ${e.clientY}`);
  console.log('===========');
};

function main() {
  console.log(z);
  const body = document.getElementById('zzz');
  if (body) {
    body?.addEventListener('mouseenter', (e) => logMouseEvent(e));
  }
  // body.addEventListener(onmousedown, (this, e) => console.log(e));
}

main();
