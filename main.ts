import { lineBuilder } from './src/helper';
import { watchModeButton as playButtonState } from './src/modeButton';

import './main.css';
import { Person } from './src/person';
import { personCreator } from './src/personCreator';
import { speedSelect } from './src/speedSelect';

declare let window: CustomWindow;
export interface CustomWindow extends Window {
  currentState: ModeStateType;
  moveSpeed: number;
  personList: Person[];
}

export type Points = Array<{ x: number; y: number }>;
export type ModeStateType = 'Edit' | 'Play';

const rootContainer = document.querySelector('#container') as HTMLDivElement;

window.currentState = 'Play';

let selectedCurrentUser;

// TODO:  экспорты или чтение из localSTorage
window.personList = [];

if (document && rootContainer) {
  const personPoint: Points = [];
  window.personPoint = personPoint;

  // Speed state
  speedSelect();

  // Person State
  personCreator();

  // Current mode state
  playButtonState();

  // Risovalka
  lineBuilder(personPoint, 'red');

  let currentPointTargetForPlayerIndex = 0;
  let playerPosition = { x: 0, y: 0 };
  const runPerson = () => {
    if (window.currentState === 'Edit') {
      const player = document.querySelector('#player') as HTMLDivElement;
      const currentPoint = personPoint[currentPointTargetForPlayerIndex];
      if (currentPointTargetForPlayerIndex === 0) {
        player.style.visibility = 'visible';
        playerPosition.y = personPoint[0].y;
        playerPosition.x = personPoint[0].x;
      }
      if (currentPoint === undefined) {
        return;
      }
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
    runPerson();
  }, 25);

  // clearInterval(intervalId);
}
