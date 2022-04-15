import './main.css';

var spawnerType = '#sample';
var spawnerTypeCursor = '#sampleCursor';

const getOffsetByType = (type) => {
  if (type == '#humanSpawner') {
    return 20;
  } else {
    return 2;
  }
};

let currentMode = true;

checkModeButton();

document.querySelector('#humanSpawner').onclick = () => {
  spawnerType = '#humanSpawner';
  spawnerTypeCursor = '#humanSpawnerCursor';
  console.log(spawnerType);
};

document.querySelector('#modeButton').onclick = () => {
  currentMode = !currentMode;
  checkModeButton();
};

const allPoints = [];
// document.allPoints = allPoints;
let previous = undefined;
document.querySelector('#root').onclick = (event) => {
  let div = document.createElement('div');
  div.classList.add('asd');

  div.style.position = 'absolute';
  const offset = getOffsetByType(spawnerType);
  div.style.top = event.clientY - offset + 'px';
  div.style.left = event.clientX - offset + 'px';
  if (previous != undefined) {
    drawLine(event.clientX - offset, event.clientY, previous.style.left, previous.style.top);
  }
  previous = div;
  allPoints.push({
    x: event.clientX - offset,
    y: event.clientY - offset,
  });
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

const drawLine = (x1, y1, x2, y2) => {
  var newDiv = document.createElement('div');
  newDiv.style.position = 'absolute';
  newDiv.innerHTML = `<svg width="900" height="900"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black"/></svg>`;
  document.querySelector('#root').append(newDiv);
};
function checkModeButton() {
  if (currentMode === true) {
    document.querySelector('#modeButton').textContent = 'Edit';
  } else if (currentMode === false) {
    document.querySelector('#modeButton').textContent = 'Play';
  }
}

let currentPointTargetForPlayerIndex = 0;
let playerPosition = { x: 22, y: 22 };
const intervalId = setInterval(() => {
  const player = document.querySelector('#player');
  if (allPoints[currentPointTargetForPlayerIndex] == undefined) {
    return;
  }
  const currentPoint = allPoints[currentPointTargetForPlayerIndex];
  if (Math.abs(playerPosition.y - currentPoint.y) < 10 && Math.abs(playerPosition.x - currentPoint.x) < 10) {
    currentPointTargetForPlayerIndex++;
  }
  if (Math.abs(playerPosition.y - currentPoint.y) >= 10) {
    if (playerPosition.y - currentPoint.y < 0) {
      playerPosition.y = playerPosition.y + 5;
    } else {
      playerPosition.y = playerPosition.y - 5;
    }
  }
  if (Math.abs(playerPosition.x - currentPoint.x) >= 10) {
    if (playerPosition.x - currentPoint.x < 0) {
      playerPosition.x = playerPosition.x + 5;
    } else {
      playerPosition.x = playerPosition.x - 5;
    }
  }
  player.style.top = playerPosition.y + 'px';
  player.style.left = playerPosition.x + 'px';
}, 50);

// clearInterval(intervalId);
