import { area, CustomWindow } from '../main';
import { createDiv } from './helper';
import { Person } from './person';

declare let window: CustomWindow;

export const runPerson = (person: Person) => {
  if (window.currentState === 'Edit') {
    const currentPoint = person.pointList[person.currentPointTarget];
    if (currentPoint === undefined) {
      return;
    }
    let player;

    if (person.currentPointTarget === 0) {
      player = createDiv();
      player.setAttribute('class', `player player${person.id}`);
      area.append(player);
      player.style.backgroundColor = person.color.color;
      player.style.position = 'absolute';
      player.style.width = '18px';
      player.style.height = '18px';
      player.style.borderRadius = '50%';

      person.setPosition({
        x: person.pointList[0].x,
        y: person.pointList[0].y,
      });
    } else {
      player = document.querySelector(`.player${person.id}`) as HTMLDivElement;
    }

    if (Math.abs(person.y - currentPoint.y) < 6 && Math.abs(person.x - currentPoint.x) < 6) {
      person.currentPointTarget++;
    }
    if (Math.abs(person.y - currentPoint.y) >= 6) {
      if (person.y - currentPoint.y < 0) {
        person.y = person.y + 5;
      } else {
        person.y = person.y - 5;
      }
    }
    if (Math.abs(person.x - currentPoint.x) >= 6) {
      if (person.x - currentPoint.x < 0) {
        person.x = person.x + 5;
      } else {
        person.x = person.x - 5;
      }
    }
    player.style.top = person.y + 'px';
    player.style.left = person.x + 'px';
  }
};
