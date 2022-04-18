import { CustomWindow, ModeStateType } from '../main';

declare let window: CustomWindow;

export const watchModeButton = () => {
  writeModeButtonText(window.currentState);
  document.querySelector('#modeButton').onclick = () => {
    window.currentState = revertModeButton(window.currentState);
    writeModeButtonText(window.currentState);
  };
};

export const revertModeButton = (state: ModeStateType) => {
  if (state === 'edit') {
    return 'play';
  } else {
    return 'edit';
  }
};

export const writeModeButtonText = (state: ModeStateType) => {
  if (state === 'edit') {
    document.querySelector('#modeButton').textContent = 'Edit';
  } else if (state === 'play') {
    document.querySelector('#modeButton').textContent = 'Play';
  }
};
