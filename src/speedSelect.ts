import { CustomWindow } from '../main';
import { searchOpacityColorByOriginal, searchOriginalColorByOpacity } from './helper';
import { revertModeButton, writeModeButtonText } from './modeButton';
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
    playButtonHandlers();
  }, window.moveSpeed);
};

export const checkLinesExist = () => {
  const res = window.personList.map((person) => {
    return person.pointList.length > 0;
  });
  return res.some((i) => i === true);
};

export const playButtonHandlers = () => {
  const btn = document.querySelector('#modeButton') as HTMLElement;
  if (!checkLinesExist()) {
    writeModeButtonText(window.currentState);
    btn.style.cursor = 'not-allowed';
    btn.style.backgroundColor = 'gray';
    btn.style.border = '1px solid gray';
    btn.onclick = (e) => {
      console.log('please add person');
    };
  } else {
    writeModeButtonText(window.currentState);
    btn.style.cursor = 'pointer';
    btn.style.backgroundColor = '#e64980d0';
    btn.style.border = '1px solid #e64980';
    btn.onclick = () => {
      const personUi = document.querySelector('#personList') as HTMLElement;
      const logViewUi = document.querySelector('#logView') as HTMLElement;
      if (window.currentState === 'Play') {
        personUi.style.visibility = 'hidden';
        personUi.style.height = '0px';
        personUi.style.padding = '0px';
        logViewUi.style.visibility = 'visible';
      } else {
        personUi.style.visibility = 'visible';
        personUi.style.height = 'auto';
        personUi.style.padding = '15px';
        logViewUi.style.visibility = 'hidden';
      }

      window.currentState = revertModeButton(window.currentState);
      writeModeButtonText(window.currentState);
      window.rerenderLineColor = 0;
    };
  }
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
