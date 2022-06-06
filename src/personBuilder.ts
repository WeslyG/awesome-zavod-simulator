import { createDiv } from './helper';
import { Person } from './person';

export const personBuilder = (person: Person) => {
  const personDiv = createDiv();
  const leftColumn = createDiv();
  const rightColumn = createDiv();

  personDiv.setAttribute('class', 'userCard');
  personDiv.setAttribute('id', `${person.id.toString()}`);
  leftColumn.setAttribute('class', 'leftFlex');
  rightColumn.setAttribute('class', 'rightFlex');

  // ID
  const idWrapper = createDiv();
  idWrapper.setAttribute('class', 'userWrapper');
  idWrapper.setAttribute('id', 'idWrapper');
  const pId = document.createElement('p');
  pId.innerHTML = `id = ${person.id.toString()}`;
  idWrapper.appendChild(pId);
  leftColumn.appendChild(idWrapper);

  // NAME
  const nameWrapper = createDiv();
  nameWrapper.setAttribute('class', 'userWrapper');
  const pName = document.createElement('p');
  pName.setAttribute('class', 'personNameText personText');
  pName.innerHTML = 'Имя';
  nameWrapper.appendChild(pName);

  const inputName = document.createElement('input');
  inputName.type = 'text';
  inputName.value = person.name;
  inputName.setAttribute('class', 'personNameInput personInput');
  inputName.onchange = (e) => {
    person.name = e.target.value;
  };
  nameWrapper.appendChild(inputName);
  leftColumn.appendChild(nameWrapper);

  // RTLS
  const rtlsWrapper = createDiv();
  rtlsWrapper.setAttribute('class', 'userWrapper');
  const pRtls = document.createElement('p');
  pRtls.innerHTML = 'rtlsID';
  pRtls.setAttribute('class', 'personRtlsText personText');
  rtlsWrapper.appendChild(pRtls);

  const inputRTLS = document.createElement('input');
  inputRTLS.type = 'text';
  inputRTLS.value = person.rtlsID.toString();
  inputRTLS.setAttribute('class', 'personRtlsInput personInput');
  inputRTLS.onchange = (e) => {
    person.rtlsID = parseInt(e.target.value, 10);
  };
  rtlsWrapper.appendChild(inputRTLS);
  leftColumn.appendChild(rtlsWrapper);

  // SCUD
  const scudWrapper = createDiv();
  scudWrapper.setAttribute('class', 'userWrapper');
  const pScud = document.createElement('p');
  pScud.innerHTML = 'scudID';
  pScud.setAttribute('class', 'personScudText personText');
  scudWrapper.appendChild(pScud);

  const inputScud = document.createElement('input');
  inputScud.type = 'text';
  inputScud.value = person.scudID.toString();
  inputScud.setAttribute('class', 'personRtlsInput personInput');
  inputScud.onchange = (e) => {
    person.scudID = parseInt(e.target.value, 10);
  };
  scudWrapper.appendChild(inputScud);
  leftColumn.appendChild(scudWrapper);

  const selectButton = createDiv();
  selectButton.setAttribute('class', 'selectUserButton');
  selectButton.setAttribute('style', `background: ${person.color.color}`);

  selectButton.innerHTML = 'Выбрать';
  rightColumn.appendChild(selectButton);

  personDiv.appendChild(leftColumn);
  personDiv.appendChild(rightColumn);

  return personDiv;

  // <div id="1">
  //   <p>id ${id}</p>

  //   <p>имя</p>
  //   <input type="text" value="Ваня" />

  //   <p>rtlsID</p>
  //   <input type="text" value="1" />

  //   <p>cardId</p>
  //   <input type="text" value="1" />

  // </div>;
};
