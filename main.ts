import { clearAll, lineBuilder, resetPosition } from './src/helper';
import { watchModeButton as playButtonState } from './src/modeButton';

import './main.css';
import { Person } from './src/person';
import { personCreator } from './src/personCreator';
import { speedSelect, startLogger } from './src/speedSelect';
import { initActions } from './src/actions/actionList';

declare let window: CustomWindow;
export interface CustomWindow extends Window {
  rerenderLineColor: number;
  currentState: ModeStateType;
  moveSpeed: number;
  calculateSpeed: number;
  previous: undefined | HTMLDivElement;
  personList: Person[];
  calculateId: number;
  runIntervalID: number;
  movedOffsetX: undefined | number;
  movedOffsetY: undefined | number;
  selectedMovedElement: undefined | HTMLElement;
  selectedCurrentUser: undefined | number;
  logEvents: Array<string>;
  globalProbability: number;
  obstacleState: { camera: number; rtls: number; scud: number };
}

export type Coordinates = { x: number; y: number };
export type Points = Array<Coordinates>;
export type ModeStateType = 'Edit' | 'Play';

export const rootContainer = document.querySelector('#container') as HTMLDivElement;
export const area = document.querySelector('#actionArea') as HTMLDivElement;
export const clearAllElement = document.querySelector('#clearAll') as HTMLDivElement;
export const resetElement = document.querySelector('#reset') as HTMLDivElement;

window.currentState = 'Play';
window.rerenderLineColor = 1;
window.selectedCurrentUser = undefined;
window.logEvents = [];
window.globalProbability = 1;
window.obstacleState = {
  camera: 0,
  rtls: 0,
  scud: 0,
};

// TODO:  экспорты или чтение из localSTorage
window.personList = [];

if (document && rootContainer) {
  // Person State
  personCreator();

  clearAllElement.onclick = () => clearAll();
  resetElement.onclick = () => resetPosition();

  area.onmousedown = (e) => {
    if (e.target.id !== 'actionArea') {
      window.selectedMovedElement = e.target as HTMLElement;
      window.movedOffsetX = e.offsetX;
      window.movedOffsetY = e.offsetY;
    }
  };

  area.onmousemove = (e) => {
    if (window.selectedMovedElement != undefined) {
      window.selectedMovedElement.style.top = e.clientY - window.movedOffsetY + 'px';
      window.selectedMovedElement.style.left = e.clientX - window.movedOffsetX + 'px';
      window.selectedMovedElement.style.cursor = 'grabbing';
    }
  };

  area.onmouseup = () => {
    if (window.selectedMovedElement) {
      window.selectedMovedElement.style.cursor = 'grab';
      window.selectedMovedElement = undefined;
    }
    window.movedOffsetX = undefined;
    window.movedOffsetY = undefined;
  };

  // line view
  lineBuilder();

  // Editor
  initActions();

  // Speed state
  speedSelect();

  startLogger();
}
