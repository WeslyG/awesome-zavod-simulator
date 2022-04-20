import { createDiv } from './helper';
import { Person } from './person';

export const personBuilder = (person: Person) => {
  const personDiv = createDiv();
  personDiv.setAttribute('id', person.id.toString());

  const pId = document.createElement('p');
  pId.innerHTML = `id = ${person.id.toString()}`;
  personDiv.appendChild(pId);

  // NAME
  const pName = document.createElement('p');
  pName.innerHTML = 'Имя';
  personDiv.appendChild(pName);

  const inputName = document.createElement('input');
  inputName.type = 'text';
  inputName.value = person.name;
  personDiv.appendChild(inputName);

  // RTLS
  const pRtls = document.createElement('p');
  pRtls.innerHTML = 'rtlsID';
  personDiv.appendChild(pRtls);

  const inputRTLS = document.createElement('input');
  inputRTLS.type = 'text';
  inputRTLS.value = person.rtlsID.toString();
  personDiv.appendChild(inputRTLS);

  // SCUD
  const pScud = document.createElement('p');
  pScud.innerHTML = 'scudID';
  personDiv.appendChild(pScud);

  const inputScud = document.createElement('input');
  inputScud.type = 'text';
  inputScud.value = person.scudID.toString();
  personDiv.appendChild(inputScud);

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
