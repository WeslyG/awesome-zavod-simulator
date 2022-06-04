import { Action } from './action';
import { createDiv } from '../helper';
import { area, CustomWindow } from '../../main';

declare let window: CustomWindow;

export const actionEditor = (action: Action) => {
  console.log('started');
  const div = createDiv();
  div.setAttribute('class', 'cameraObstacle');
  div.style.backgroundColor = action.color;
  div.style.position = 'absolute';
  div.style.height = '120px';
  div.style.width = '300px';
  div.style.top = '340px';
  div.style.left = '340px';
  area.append(div);

  div.keydown = (e) => {
    // взять положить
    console.log(e);
    // console.log('onclick');
    // if (window.moveElement) {
    //   div.style.top = e.offsetY + 'px';
    //   div.style.left = e.offsetX + 'px';
    // } else {
    //   window.moveElement = true;
    // }
  };

  div.onwheel = (e) => {
    if (e.shiftKey) {
      // Shift ----->
      const currentWith = parseInt(div.style.width);
      editItem(div, e, currentWith, 'width', 20);
      console.log('shift');
    } else if (e.ctrlKey) {
      // CTRL - up/down
      const currentHeight = parseInt(div.style.height);
      editItem(div, e, currentHeight, 'height', 20);
      console.log('ctrl');
    } else if (e.altKey) {
      // ALT - rotate
      const parsedDeg = div.style.transform.match(/\((\d+)deg\)/);
      const current = parsedDeg?.length > 0 ? parseInt(parsedDeg[1]) : 0;

      if (Math.sign(e.wheelDelta) === -1) {
        const value = current - 10;
        div.style.transform = `rotate(${value}deg)`;
      } else if (Math.sign(e.wheelDelta) === 1) {
        const value = current + 10;
        div.style.transform = `rotate(${value}deg)`;
      }
      console.log('alt');
    }
  };
};

const editItem = (div, e, param, attribute, count) => {
  if (Math.sign(e.wheelDelta) === -1) {
    div.style[attribute] = param > count * 2 ? param - count + 'px' : param + 'px';
  } else if (Math.sign(e.wheelDelta) === 1) {
    div.style[attribute] = param + count + 'px';
  }
};
