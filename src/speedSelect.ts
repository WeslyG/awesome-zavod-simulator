import { CustomWindow } from '../main';
import { searchOpacityColorByOriginal, searchOriginalColorByOpacity } from './helper';
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

const startInterval = () => {
  window.runIntervalID = setInterval(() => {
    window.personList.map((i) => {
      runPerson(i);
    });
    lineColorToOpacity();
  }, window.moveSpeed);
};

export const lineColorToOpacity = () => {
  if (window.currentState === 'Edit' && window.rerenderLineColor === 0) {
    const allLines = document.querySelectorAll('line');
    Array.from(allLines).map((line) => {
      const color = line.getAttribute('stroke') as string;
      const newColor = searchOpacityColorByOriginal(color);
      line.setAttribute('stroke', newColor);
    });
    const allPoints = document.querySelectorAll('.linePoint');
    Array.from(allPoints).map((point) => {
      const color = point.style.backgroundColor;
      const newColor = searchOpacityColorByOriginal(color);
      point.style.backgroundColor = newColor;
    });
    window.rerenderLineColor = 1;
  } else if (window.currentState === 'Play' && window.rerenderLineColor === 0) {
    const allLines = document.querySelectorAll('line');
    Array.from(allLines).map((line) => {
      const color = line.getAttribute('stroke') as string;
      const newColor = searchOriginalColorByOpacity(color);
      line.setAttribute('stroke', newColor);
    });
    const allPoints = document.querySelectorAll('.linePoint');
    Array.from(allPoints).map((point) => {
      const color = point.style.backgroundColor;
      const newColor = searchOriginalColorByOpacity(color);
      point.style.backgroundColor = newColor;
    });
    window.rerenderLineColor = 1;
  }
};
