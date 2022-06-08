import { CustomWindow } from '../../main';
import { createNewDate } from '../helper';
import { Person } from '../person';

declare let window: CustomWindow;

// @ts-ignore
const socket = io();

export const cameraReaction = (userId: string, cameraId: string) => {
  // if (checkProbability()) {
  const data = `${createNewDate()} user ${userId} camera ${cameraId}`;
  window.logEvents.push(data);
  socket.emit('message', data);
  // console.log(data);
  // }
};

export const rtlsReaction = (userId: string, entity: { rtlsZoneId: string; x: number; y: number }) => {
  const data = `${createNewDate()} user ${userId} rtlsid = ${entity.rtlsZoneId} coordinates x=${entity.x} y=${
    entity.y
  }`;
  window.logEvents.push(data);
  socket.emit('message', data);
  // console.log(data);
};

export const scudReaction = (userId: string, scudID: string) => {
  const data = `${createNewDate()} user ${userId} scudId = ${scudID} action = inside/outside`;
  window.logEvents.push(data);
  socket.emit('message', data);
  // console.log(data);
};

// export const checkProbability = (): boolean => {
//   window.globalProbability
// };
