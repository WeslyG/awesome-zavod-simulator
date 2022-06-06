import { CustomWindow, ModeStateType } from '../main';

export const revertModeButton = (state: ModeStateType) => {
  if (state === 'Edit') {
    return 'Play';
  } else {
    return 'Edit';
  }
};

export const writeModeButtonText = (state: ModeStateType) => {
  document.querySelector('#modeButton').textContent = state;
};
