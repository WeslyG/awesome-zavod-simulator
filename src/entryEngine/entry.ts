import { Coordinates } from '../../main';

export const entryEngine = (element: HTMLElement, point: Coordinates): boolean => {
  const rectData = element.getBoundingClientRect();
  console.log(rectData);
  const a = {
    x: rectData.x,
    y: rectData.y,
  };
  const c = {
    x: rectData.x + rectData.height,
    y: rectData.y + rectData.width,
  };
  if (point.x >= a.x && point.x <= c.x && point.y >= a.y && point.y <= c.y) {
    return true;
  } else {
    return false;
  }
};
