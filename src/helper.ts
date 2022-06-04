import { Points, CustomWindow } from '../main';

declare let window: CustomWindow;

const area = document.querySelector('#actionArea') as HTMLDivElement;

export const lineBuilder = (personPoint: Points, color: string = 'black') => {
  let previous: undefined | HTMLDivElement = undefined;
  area.onclick = (event) => {
    const div = createDiv();
    const size = 10;

    div.style.position = 'absolute';
    div.style.height = `${size}px`;
    div.style.width = `${size}px`;
    div.style.borderRadius = '50%';
    div.style.top = `${event.offsetY}px`;
    div.style.left = `${event.offsetX}px`;
    div.style.backgroundColor = color;
    area.append(div);

    if (previous !== undefined) {
      drawLine(event.offsetX, event.offsetY, previous.style.left, previous.style.top, color);
    }
    previous = div;
    personPoint.push({
      x: event.offsetX,
      y: event.offsetY,
    });
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
