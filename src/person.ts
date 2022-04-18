export class Person {
  private readonly id: number;
  private readonly name: string;
  private x: number = 1;
  private y: number = 1;

  public constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  public getAccountInfo() {
    return {
      id: this.id,
      name: this.name,
    };
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
