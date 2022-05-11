import { generateRandomColor } from './helper';

export class Person {
  readonly id: number;
  readonly name: string;
  readonly color: string;
  scudID: number;
  rtlsID: number;
  x: number = 1;
  y: number = 1;

  public constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.scudID = this.id;
    this.rtlsID = this.id;
    this.color = generateRandomColor();
  }

  public getCurrentPosition() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  public moveTo({ x, y }) {
    this.x = x;
    this.y = y;
  }
}
