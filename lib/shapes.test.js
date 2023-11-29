const { Shape, Triangle, Square, Circle } = require("./shapes");

describe("shapes render Test", () => {
  it("setColor sets the correct color", () => {
    const shape = new Shape();
    shape.setColor("yellow");
    expect(shape.color).toBe("yellow");
  });
  it("Triangle should renders correctly", () => {
    const shape = new Triangle();
    shape.setColor("red");
    expect(shape.render()).toEqual(
      '<polygon points="150, 18 244, 182 56, 182" fill="red" />'
    );
  });
});

it("Square should renders correctly", () => {
  const shape = new Square();
  shape.setColor("orange");
  expect(shape.render()).toEqual(
    '<rect x="50" width="200" height="200" fill="orange" />'
  );
});

it("Circle should renders correctly", () => {
  const shape = new Circle();
  shape.setColor("blue");
  expect(shape.render()).toEqual(
    '<circle cx="150" cy="100" r="100" fill="blue" />'
  );
});
