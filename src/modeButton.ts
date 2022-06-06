import { CustomWindow, ModeStateType } from '../main';

declare let window: CustomWindow;

export const watchModeButton = () => {
  writeModeButtonText(window.currentState);
  document.querySelector('#modeButton').onclick = () => {
    window.currentState = revertModeButton(window.currentState);
    writeModeButtonText(window.currentState);
    window.rerenderLineColor = 0;
  };
};

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
