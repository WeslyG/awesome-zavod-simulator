import { Action } from './action';
import { actionEditor } from './actionEditor';

export const cameraAction = new Action('camera', '#40c05788');
export const rtlsAction = new Action('rtls', '#be4bdba6');
export const scudAction = new Action('scud', '#15abbfa2');
export const wallAction = new Action('wall', '#7950f298');

export const initActions = () => {
  const camera = document.querySelector('#camera') as HTMLDivElement;
  camera.onclick = () => actionEditor(cameraAction);

  const rtls = document.querySelector('#rtls') as HTMLDivElement;
  rtls.onclick = () => actionEditor(rtlsAction);

  const scud = document.querySelector('#scud') as HTMLDivElement;
  scud.onclick = () => actionEditor(scudAction);

  const wall = document.querySelector('#wall') as HTMLDivElement;
  wall.onclick = () => actionEditor(wallAction);
};
