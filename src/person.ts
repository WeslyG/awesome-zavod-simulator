import { Points } from '../main';
import { generateRandomColor } from './helper';

export class Person {
  readonly id: number;
  readonly name: string;
  readonly color: {
    color: string;
    active: string;
  };

  scudID: number;
  rtlsID: number;

  public x: number = 0;
  public y: number = 0;

  public constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.scudID = this.id;
    this.rtlsID = this.id;
    this.color = generateRandomColor();
  }

  public currentPointTarget: number = 0;

  public pointList: Points = [];

  public setPosition({ x, y }) {
    this.x = x;
    this.y = y;
  }

  public getCurrentPosition() {
    return {
      x: this.x,
      y: this.y,
    };
  }
}
