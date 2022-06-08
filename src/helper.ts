import { Points, CustomWindow, area } from '../main';

declare let window: CustomWindow;

export const createNewDate = () => {
  return new Date().toLocaleString();
};

export const lineBuilder = () => {
  window.previous = undefined;
  area.onclick = (event) => {
    if (window.selectedCurrentUser != undefined) {
      const person = window.personList[window.selectedCurrentUser - 1];
      const personPoint: Points = person.pointList;
      const div = createDiv();
      const size = 8;

      div.style.position = 'absolute';
      div.style.height = `${size}px`;
      div.style.width = `${size}px`;
      div.style.borderRadius = '50%';
      // TODO: Кривая рисовалка
      div.style.top = `${event.offsetY + 2}px`;
      div.style.left = `${event.offsetX + 3}px`;
      div.style.backgroundColor = person.color.color;
      div.className = 'linePoint';
      area.append(div);

      if (window.previous !== undefined) {
        drawLine(
          event.offsetX,
          event.offsetY,
          window.previous.style.left,
          window.previous.style.top,
          person.color.color,
        );
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
  newDiv.innerHTML = `
    <svg width="1150" height="900">
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}"/>
    </svg>`;
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
  window.logEvents = [];
  const logger = document.querySelector('#logView') as HTMLElement;
  logger.innerHTML = '';
  window.currentState = 'Play';
  const personUi = document.querySelector('#personList') as HTMLElement;
  const logViewUi = document.querySelector('#logView') as HTMLElement;
  personUi.style.visibility = 'visible';
  personUi.style.height = '0px';
  personUi.style.padding = '0px';
  logViewUi.style.visibility = 'hidden';
  window.obstacleState = {
    camera: 0,
    rtls: 0,
    scud: 0,
  };
};

export const resetPosition = () => {
  if (arrayNotEmpty(window.personList)) {
    window.currentState = 'Play';
    window.rerenderLineColor = 0;
    const personUi = document.querySelector('#personList') as HTMLElement;
    const logViewUi = document.querySelector('#logView') as HTMLElement;
    personUi.style.visibility = 'visible';
    personUi.style.padding = '15px';
    logViewUi.style.visibility = 'hidden';
    window.logEvents = [];
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

export const searchOpacityColorByOriginal = (color: string): string => {
  let result = '';
  colors.map((cls) => {
    if (cls.color === color) {
      result = cls.active;
    }
  });
  return result;
};

export const searchOriginalColorByOpacity = (color: string): string => {
  let result = '';
  colors.map((cls) => {
    if (cls.active === color) {
      result = cls.color;
    }
  });
  return result;
};

export const colors = [
  {
    color: 'rgb(30, 167, 227)',
    active: 'rgba(30, 168, 227, 0.3)',
  },
  {
    color: 'rgb(26, 188, 177)',
    active: 'rgba(26, 188, 177, 0.3)',
  },
  {
    color: 'rgba(96, 230, 154)',
    active: 'rgba(96, 230, 154, 0.3)',
  },
  {
    color: 'rgba(107, 215, 254)',
    active: 'rgba(107, 215, 254, 0.3)',
  },
  {
    color: 'rgb(146, 200, 63)',
    active: 'rgba(145, 200, 63, 0.3)',
  },
  {
    color: 'rgb(16, 122, 162)',
    active: 'rgba(16, 123, 162, 0.3)',
  },
  {
    color: 'rgb(240, 80, 154)',
    active: 'rgba(240, 80, 155, 0.3)',
  },
];

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
