import { addPathPoint, getOffsetByType, onSelect } from './src/helper';
import { watchModeButton } from './src/modeButton';

import './main.css';

declare let window: CustomWindow;
export interface CustomWindow extends Window {
  currentState: ModeStateType;
  moveSpeed: number;
}

const root = document.querySelector('#root') as HTMLDivElement | null;
const selectEl = document.querySelector('#speedTest') as HTMLSelectElement | null;

export type AllPointsType = Array<{ x: number; y: number }>;
export type ModeStateType = 'edit' | 'play';

window.currentState = 'edit';
window.moveSpeed = selectEl ? parseInt(selectEl?.value) : 50;

if (document && root) {
  const spawnerType = '#sample';
  const spawnerTypeCursor = '#sampleCursor';
  const allPoints: AllPointsType = [];

  watchModeButton();
  onSelect();

  addPathPoint(root, spawnerType, allPoints);

  root.addEventListener('mousemove', (event) => {
    const offset = getOffsetByType(spawnerType);
    const element = document.querySelector(spawnerTypeCursor);
    element.style.position = 'absolute';
    element.style.top = event.clientY - offset + 'px';
    element.style.left = event.clientX - offset + 'px';
  });

  let currentPointTargetForPlayerIndex = 0;
  let playerPosition = { x: 20, y: 20 };
  setInterval(() => {
    if (window.currentState === 'play') {
      const player = document.querySelector('#player');
      if (allPoints[currentPointTargetForPlayerIndex] == undefined) {
        return;
      }
      const currentPoint = allPoints[currentPointTargetForPlayerIndex];
      if (Math.abs(playerPosition.y - currentPoint.y) < 10 && Math.abs(playerPosition.x - currentPoint.x) < 10) {
        currentPointTargetForPlayerIndex++;
      }
      if (Math.abs(playerPosition.y - currentPoint.y) >= 10) {
        if (playerPosition.y - currentPoint.y < 0) {
          playerPosition.y = playerPosition.y + 5;
        } else {
          playerPosition.y = playerPosition.y - 5;
        }
      }
      if (Math.abs(playerPosition.x - currentPoint.x) >= 10) {
        if (playerPosition.x - currentPoint.x < 0) {
          playerPosition.x = playerPosition.x + 5;
        } else {
          playerPosition.x = playerPosition.x - 5;
        }
      }
      player.style.top = playerPosition.y + 'px';
      player.style.left = playerPosition.x + 'px';
    }
  }, 30);

  // clearInterval(intervalId);
}
