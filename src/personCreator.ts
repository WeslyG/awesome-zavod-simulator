import { CustomWindow } from '../main';
import { generateRandomUserName } from './helper';
import { Person } from './person';
import { personBuilder } from './personBuilder';

declare let window: CustomWindow;

export const personCreator = () => {
  const createPersonButton = document.getElementById('createNewPerson') as HTMLDivElement;
  createPersonButton.onclick = () => {
    const person = new Person(window.personList.length + 1, generateRandomUserName());
    window.personList.push(person);

    const ul = document.getElementById('personList');
    const li = document.createElement('li');
    const personHTML = personBuilder(person);
    li.append(personHTML);
    ul?.append(li);
  };
};
