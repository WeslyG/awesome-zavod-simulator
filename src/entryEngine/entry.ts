import { Coordinates } from '../../main';

export const entryEngine = (element: HTMLElement, point: Coordinates): boolean => {
  const rectData = element.getBoundingClientRect();
  const a = {
    x: rectData.y,
    y: rectData.x,
  };
  const c = {
    x: rectData.y + rectData.height,
    y: rectData.x + rectData.width,
  };
  if (point.x >= a.x && point.x <= c.x && point.y >= a.y && point.y <= c.y) {
    return true;
  } else {
    return false;
  }
};
