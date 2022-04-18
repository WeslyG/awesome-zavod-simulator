import { AllPointsType, CustomWindow } from '../main';

declare let window: CustomWindow;

export const drawLine = (x1, y1, x2, y2) => {
  var newDiv = document.createElement('div');
  newDiv.style.position = 'absolute';
  newDiv.innerHTML = `<svg width="900" height="900"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black"/></svg>`;
  document.querySelector('#root').append(newDiv);
};

export const delay = (time: number) => {
  return new Promise((res, rej) => {
    setTimeout(() => res(true), time);
  });
};

export const createDiv = () => document.createElement('div');

export const getOffsetByType = (type) => {
  if (type == '#humanSpawner') {
    return 20;
  } else {
    return 2;
  }
};

export const addPathPoint = (root: HTMLDivElement, spawnerType: string, allPoints: AllPointsType) => {
  let previous: HTMLDivElement | undefined = undefined;
  root.onclick = (event) => {
    let div = createDiv();
    div.classList.add('asd');
    div.style.position = 'absolute';

    const offset = getOffsetByType(spawnerType);
    div.style.top = event.clientY - offset + 'px';
    div.style.left = event.clientX - offset + 'px';
    if (previous != undefined) {
      drawLine(event.clientX - offset, event.clientY, previous.style.left, previous.style.top);
    }
    previous = div;
    allPoints.push({
      x: event.clientX - offset,
      y: event.clientY - offset,
    });
    root.append(div);
  };
};

export const onSelect = () => {
  document.querySelector('#speedTest').onchange = (e) => {
    window.moveSpeed = parseInt(e.target.value);
  };
};
