import { createDiv, lineBuilder } from './src/helper';
import { watchModeButton as playButtonState } from './src/modeButton';

import './main.css';
import { Person } from './src/person';
import { personCreator } from './src/personCreator';
import { speedSelect } from './src/speedSelect';

declare let window: CustomWindow;
export interface CustomWindow extends Window {
  currentState: ModeStateType;
  moveSpeed: number;
  previous: undefined | HTMLDivElement;
  personList: Person[];
  runIntervalID: number;
  selectedCurrentUser: undefined | number;
}

export type Coordinates = { x: number; y: number };
export type Points = Array<Coordinates>;
export type ModeStateType = 'Edit' | 'Play';

export const rootContainer = document.querySelector('#container') as HTMLDivElement;

window.currentState = 'Play';

window.selectedCurrentUser = undefined;

// TODO:  экспорты или чтение из localSTorage
window.personList = [];

if (document && rootContainer) {
  // Person State
  personCreator();

  // Current mode state
  playButtonState();

  // line view
  lineBuilder();

  // Speed state
  speedSelect();
}
