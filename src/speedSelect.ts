import { CustomWindow } from '../main';

declare let window: CustomWindow;

export const speedSelect = () => {
  const speedSelect = document.querySelector('#speedSelect') as HTMLSelectElement;

  window.moveSpeed = parseInt(speedSelect.value);

  speedSelect.onchange = (event) => {
    window.moveSpeed = parseInt(event.target.value);
  };
};
