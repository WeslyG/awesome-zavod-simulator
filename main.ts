import './main.css';

var spawnerType = 0;
var spawnerTypeCursor = '#sampleCursor';

const getOffsetByType = (type) => {
  if (type == '#humanSpawner') {
    return 20;
  } else {
    return 2;
  }
};

document.querySelector('#humanSpawner').onclick = () => {
  spawnerType = '#humanSpawner';
  spawnerTypeCursor = '#humanSpawnerCursor';
  console.log(spawnerType);
};

document.querySelector('#root').onclick = (event) => {
  let div = document.createElement('div');
  div.classList.add('asd');
  div.style.position = 'absolute';
  const offset = getOffsetByType(spawnerType);
  div.style.top = event.clientY - offset + 'px';
  div.style.left = event.clientX - offset + 'px';
  document.querySelector('#root').append(div);
};

document.querySelector('#root').addEventListener('mousemove', (event) => {
  const x = event.clientX;
  const y = event.clientY;
  const offset = getOffsetByType(spawnerType);
  const element = document.querySelector(spawnerTypeCursor);
  element.style.position = 'absolute';
  element.style.top = y - offset + 'px';
  element.style.left = x - offset + 'px';
});
