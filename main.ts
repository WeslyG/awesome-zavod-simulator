import { addPathPoint, getOffsetByType, onSelect } from './src/helper';
import { watchModeButton } from './src/modeButton';

import './main.css';
import { Person } from './src/person';
import { personCreator } from './src/personCreator';

declare let window: CustomWindow;
export interface CustomWindow extends Window {
  currentState: ModeStateType;
  moveSpeed: number;
  personList: Person[];
}

const rootContainer = document.querySelector('#container') as HTMLDivElement | null;
const selectEl = document.querySelector('#speedTest') as HTMLSelectElement | null;

export type AllPointsType = Array<{ x: number; y: number }>;
export type ModeStateType = 'Edit' | 'Play';

window.currentState = 'Play';
window.moveSpeed = selectEl ? parseInt(selectEl?.value) : 50;
window.personList = [];

if (document && rootContainer) {
  const spawnerType = '#sample';
  const spawnerTypeCursor = '#sampleCursor';
  const allPoints: AllPointsType = [];

  watchModeButton();
  onSelect();
  addPathPoint(rootContainer, spawnerType, allPoints);
  personCreator();

  rootContainer.addEventListener('mousemove', (event) => {
    const offset = getOffsetByType(spawnerType);
    const element = document.querySelector(spawnerTypeCursor);
    element.style.position = 'absolute';
    element.style.top = event.clientY - offset + 'px';
    element.style.left = event.clientX - offset + 'px';
  });

  let currentPointTargetForPlayerIndex = 0;
  let playerPosition = { x: 20, y: 20 };
  const runScript = () => {
    if (window.currentState === 'Play') {
      const player = document.querySelector('#player');
      if (allPoints[currentPointTargetForPlayerIndex] == undefined) {
        return;
      }
      const currentPoint = allPoints[currentPointTargetForPlayerIndex];
      if (Math.abs(playerPosition.y - currentPoint.y) < 6 && Math.abs(playerPosition.x - currentPoint.x) < 6) {
        currentPointTargetForPlayerIndex++;
      }
      if (Math.abs(playerPosition.y - currentPoint.y) >= 6) {
        if (playerPosition.y - currentPoint.y < 0) {
          playerPosition.y = playerPosition.y + 5;
        } else {
          playerPosition.y = playerPosition.y - 5;
        }
      }
      if (Math.abs(playerPosition.x - currentPoint.x) >= 6) {
        if (playerPosition.x - currentPoint.x < 0) {
          playerPosition.x = playerPosition.x + 5;
        } else {
          playerPosition.x = playerPosition.x - 5;
        }
      }
      player.style.top = playerPosition.y + 'px';
      player.style.left = playerPosition.x + 'px';
    }
  };

  setInterval(() => {
    runScript();
  }, 20);

  // clearInterval(intervalId);
}
