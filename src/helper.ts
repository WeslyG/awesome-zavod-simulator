import { Points, CustomWindow, area } from '../main';

declare let window: CustomWindow;

export const lineBuilder = () => {
  window.previous = undefined;
  area.onclick = (event) => {
    if (window.selectedCurrentUser != undefined) {
      const person = window.personList[window.selectedCurrentUser - 1];
      const personPoint: Points = person.pointList;
      const div = createDiv();
      const size = 10;

      div.style.position = 'absolute';
      div.style.height = `${size}px`;
      div.style.width = `${size}px`;
      div.style.borderRadius = '50%';
      div.style.top = `${event.offsetY}px`;
      div.style.left = `${event.offsetX}px`;
      div.style.backgroundColor = person.color;
      area.append(div);

      if (window.previous !== undefined) {
        drawLine(event.offsetX, event.offsetY, window.previous.style.left, window.previous.style.top, person.color);
      }
      window.previous = div;
      personPoint.push({
        x: event.offsetX,
        y: event.offsetY,
      });
    }
  };
};

export const drawLine = (x1, y1, x2, y2, color) => {
  var newDiv = document.createElement('div');
  newDiv.style.position = 'absolute';
  newDiv.innerHTML = `<svg width="900" height="900"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}"/></svg>`;
  area.append(newDiv);
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

export const clearAll = () => {
  area.innerHTML = '';
  window.selectedCurrentUser = undefined;
  window.selectedMovedElement = undefined;
  window.movedOffsetX = undefined;
  window.movedOffsetY = undefined;
  const users = document.querySelector('#personList') as HTMLElement;
  users.innerHTML = '';
  window.personList = [];
  window.previous = undefined;
};

export const resetPosition = () => {
  if (arrayNotEmpty(window.personList)) {
    window.personList.map((i) => (i.currentPointTarget = 0));
    const players = document.querySelectorAll('.player');
    const playersArr = Array.from(players);
    if (arrayNotEmpty(playersArr)) {
      playersArr.map((player) => {
        const classes = player.classList;
        let playerId;
        Array.from(classes).map((cls) => {
          const res = cls.match(/\d+$/);
          if (res) {
            playerId = parseInt(res[0], 10);
          }
        });
        if (playerId) {
          console.log(player);
          player.style.top = window.personList[playerId - 1].pointList[0].y + 'px';
          player.style.left = window.personList[playerId - 1].pointList[0].x + 'px';
        }
      });
    }
  }
};

export const arrayNotEmpty = (array: Array<any>): boolean => {
  return array.length > 0;
};

export const generateRandomUserName = () => {
  return randomChoice(russianMansNames);
};

export const generateRandomColor = () => {
  return randomChoice(colors);
};

export const randomChoice = <T>(choices: Array<T>): T => {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
};

export const colors = ['#1EA7E3', '#1ABCB1', '#92C83F', '#107AA2', '#FCD20A', '#F0509A'];

export const russianMansNames = [
  'Александр',
  'Дмитрий',
  'Максим',
  'Сергей',
  'Андрей',
  'Алексей',
  'Артём',
  'Илья',
  'Кирилл',
  'Михаил',
  'Никита',
  'Матвей',
  'Роман',
  'Егор',
  'Арсений',
  'Иван',
  'Денис',
  'Евгений',
  'Даниил',
  'Тимофей',
  'Владислав',
  'Игорь',
  'Владимир',
  'Павел',
  'Руслан',
  'Марк',
  'Константин',
  'Тимур',
  'Олег',
  'Ярослав',
  'Антон',
  'Николай',
  'Глеб',
  'Данил',
  'Савелий',
  'Вадим',
  'Степан',
  'Юрий',
  'Богдан',
  'Артур',
  'Семен',
  'Макар',
  'Лев',
  'Виктор',
  'Елисей',
  'Виталий',
  'Вячеслав',
  'Захар',
  'Мирон',
  'Дамир',
  'Георгий',
  'Давид',
  'Платон',
  'Анатолий',
  'Григорий',
  'Демид',
  'Данила',
  'Станислав',
  'Василий',
  'Федор',
  'Родион',
  'Леонид',
  'Одиссей',
  'Валерий',
  'Святослав',
  'Борис',
  'Эдуард',
  'Марат',
  'Герман',
  'Даниэль',
  'Петр',
  'Амир',
  'Всеволод',
  'Мирослав',
  'Гордей',
  'Артемий',
  'Эмиль',
  'Назар',
  'Савва',
  'Ян',
  'Рустам',
  'Игнат',
  'Влад',
  'Альберт',
  'Тамерлан',
  'Айдар',
  'Роберт',
  'Адель',
  'Марсель',
  'Ильдар',
  'Самир',
  'Тихон',
  'Рамиль',
  'Ринат',
  'Радмир',
  'Филипп',
  'Арсен',
  'Ростислав',
  'Святогор',
  'Яромир',
];
