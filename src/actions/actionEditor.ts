import { Action } from './action';
import { createDiv } from '../helper';
import { area, CustomWindow } from '../../main';

declare let window: CustomWindow;

export const actionEditor = (action: Action) => {
  const allUsersCard = document.querySelectorAll('.userCard');
  Array.from(allUsersCard).map((user) => {
    user.style.backgroundColor = '#fff';
  });

  const element = document.querySelectorAll(`div.rightFlex > div`);
  Array.from(element).map((userBtn) => {
    if (userBtn.innerHTML === 'Выбрано') {
      userBtn.innerHTML = 'Выбрать';
    }
  });
  window.selectedCurrentUser = undefined;
  window.previous = undefined;

  const div = createDiv();
  div.setAttribute('class', `${action.name} obstacle`);
  window.obstacleState[action.name] = ++window.obstacleState[action.name];
  div.setAttribute('id', `${action.name}${window.obstacleState[action.name]}`);
  div.style.backgroundColor = action.color;
  div.style.position = 'absolute';
  div.style.height = '120px';
  div.style.width = '300px';
  div.style.top = '340px';
  div.style.left = '340px';
  area.append(div);

  div.onwheel = (e) => {
    if (e.shiftKey) {
      // Shift ----->
      const currentWith = parseInt(div.style.width);
      editItem(div, e, currentWith, 'width', 10);
    } else if (e.ctrlKey) {
      // CTRL - up/down
      const currentHeight = parseInt(div.style.height);
      editItem(div, e, currentHeight, 'height', 10);
    }
    // else if (e.altKey) {
    //   // ALT - rotate
    //   const deg = div.style.transform.match(/\((\d+)deg\)/);
    //   const current = deg?.length > 0 ? parseInt(deg[1]) : 0;

    //   if (Math.sign(e.wheelDelta) === -1) {
    //     const value = current - 10;
    //     div.style.transform = `rotate(${value}deg)`;
    //   } else if (Math.sign(e.wheelDelta) === 1) {
    //     const value = current + 10;
    //     div.style.transform = `rotate(${value}deg)`;
    //   }
    //   // console.log('alt');
    // }
  };
};

const editItem = (div, e, param, attribute, count) => {
  if (Math.sign(e.wheelDelta) === -1) {
    div.style[attribute] = param > count * 2 ? param - count + 'px' : param + 'px';
  } else if (Math.sign(e.wheelDelta) === 1) {
    div.style[attribute] = param + count + 'px';
  }
};
