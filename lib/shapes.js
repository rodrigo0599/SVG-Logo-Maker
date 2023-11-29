class Shape {
  constructor(color) {
    this.color = "";
  }
  render() {
    throw new Error("render method must be overridden in child classes");
  }
  setColor(color) {
    this.color = color;
  }
}
class Circle extends Shape {
  render() {
    return `<circle cx="150" cy="100" r="100" fill="${this.color}" />`;
  }
}

class Square extends Shape {
  render() {
    return `<rect x="50" width="200" height="200" fill="${this.color}" />`;
  }
}

class Triangle extends Shape {
  render() {
    return `<polygon points="150, 18 244, 182 56, 182" fill="${this.color}" />`;
  }
}

module.exports = { Shape, Circle, Square, Triangle };
