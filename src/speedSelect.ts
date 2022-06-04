import { CustomWindow } from '../main';
import { runPerson } from './runPerson';

declare let window: CustomWindow;

export const speedSelect = () => {
  const speedSelect = document.querySelector('#speedSelect') as HTMLSelectElement;

  window.moveSpeed = parseInt(speedSelect.value);

  startInterval();

  speedSelect.onchange = (event) => {
    clearInterval(window.runIntervalID);
    window.moveSpeed = parseInt(event.target.value);
    startInterval();
  };
};
function startInterval() {
  window.runIntervalID = setInterval(() => {
    window.personList.map((i) => {
      runPerson(i);
    });
  }, window.moveSpeed);
}
