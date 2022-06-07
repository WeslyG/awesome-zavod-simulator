import { CustomWindow } from '../main';
import { entryEngine } from './entryEngine/entry';
import { createDiv, searchOpacityColorByOriginal, searchOriginalColorByOpacity } from './helper';
import { revertModeButton, writeModeButtonText } from './modeButton';
import { cameraReaction, rtlsReaction, scudReaction } from './reactions/reactions';
import { runPerson } from './runPerson';

declare let window: CustomWindow;

export const speedSelect = () => {
  const speedSelect = document.querySelector('#speedSelect') as HTMLSelectElement;
  window.moveSpeed = parseInt(speedSelect.value);

  runViewEngine();

  speedSelect.onchange = (event) => {
    clearInterval(window.runIntervalID);
    window.moveSpeed = parseInt(event.target.value);
    runViewEngine();
  };
};

const runViewEngine = () => {
  window.runIntervalID = setInterval(() => {
    window.personList.map((i) => {
      runPerson(i);
    });
    lineColorToOpacity();
    playButtonHandlers();
  }, window.moveSpeed);
};

export const startLogger = () => {
  const speedAction = document.querySelector('#speedAction') as HTMLSelectElement;
  window.calculateSpeed = parseInt(speedAction.value);

  runLogEngine();

  speedAction.onchange = (event) => {
    clearInterval(window.calculateId);
    window.calculateSpeed = parseInt(event.target.value);
    runLogEngine();
  };
};

const runLogEngine = () => {
  window.calculateId = setInterval(() => {
    const obstacles = document.querySelectorAll('.obstacle');
    const players = document.querySelectorAll('.player');
    const obstaclesArr = Array.from(obstacles);
    const playersArr = Array.from(players);
    console.log(obstaclesArr);
    if (playersArr.length > 0 && obstaclesArr.length > 0) {
      obstaclesArr.map((obst) => {
        playersArr.map((player) => {
          const entryResult = entryEngine(obst, {
            x: parseInt(player.style.top, 10),
            y: parseInt(player.style.left, 10),
          });
          if (entryResult) {
            const playerId = Array.from(player.classList).filter((i) => i !== 'player')[0];
            const obstType = Array.from(obst.classList).filter((i) => i !== 'obstacle')[0];
            const obstId = obst.getAttribute('id') as string;
            if (obstType === 'camera') {
              cameraReaction(playerId, obstId);
            } else if (obstType === 'rtls') {
              rtlsReaction(playerId, { rtlsZoneId: obstId, x: player.style.top, y: player.style.left });
            } else if (obstType === 'scud') {
              scudReaction(playerId, obstId);
            }
          }
        });
      });
    }

    const logView = document.querySelector('#logView') as HTMLElement;
    logView.innerHTML = '';
    window.logEvents.map((i) => {
      const z = document.createElement('li');
      z.innerText = i;
      logView.append(z);
    });
  }, window.calculateSpeed);
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
