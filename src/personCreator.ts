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
    const allUsersCard = document.querySelectorAll('.userCard');
    Array.from(allUsersCard).map(
      (el) =>
        (el.onclick = function () {
          window.selectedCurrentUser = parseInt(this.id);
          Array.from(allUsersCard).map((i) => {
            const element = document.querySelector(`#\\3${i.id} > div.rightFlex > div`);
            const userCard = document.querySelector(`#\\3${i.id}`);
            if (i.id === this.id) {
              element.innerHTML = 'Выбрано';
              userCard.style.backgroundColor = 'whitesmoke';
            } else {
              element.innerHTML = 'Выбрать';
              userCard.style.backgroundColor = '#fff';
            }
            window.previous = undefined;
          });
        }),
    );
  };
};
