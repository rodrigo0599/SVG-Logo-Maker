const inquirer = require("inquirer");
const fs = require("fs");
const { Circle, Triangle, Square } = require("./lib/shapes");

const questions = [
  {
    type: "input",
    name: "text",
    message: "Please text must be up to 3 characters to display in your image.",
    validate: function (input) {
      if (input.length > 3) {
        return true;
      } else {
        return "Please enter 3 characters";
      }
    },
  },
  {
    type: "input",
    name: "text_color",
    message: "Enter the text color (or hexadecimal number):",
  },
  {
    type: "list",
    name: "shape",
    message: "Pick a shape:",
    choices: ["Circle", "Triangle", "Square"],
  },
  {
    type: "input",
    name: "color",
    message: "What color would you like your logo?",
    validate: function (input) {
      // Simple validation to check if the input is a valid color
      if (
        /^#([0-9A-F]{3}){1,2}$/i.test(input) ||
        ["red", "green", "blue", "yellow", "black", "white"].includes(
          input.toLowerCase()
        )
      ) {
        return true;
      } else {
        return "Please enter a valid color or hexadecimal number";
      }
    },
  },
];

const generateLogo = ({ text, fontColor, shape, color }) => {
  let logoGenerator;

  switch (shape) {
    case "Circle":
      logoGenerator = new Circle();
      break;
    case "Triangle":
      logoGenerator = new Triangle();
      break;
    case "Square":
      logoGenerator = new Square();
      break;
    default:
      console.error("Invalid shape");
      return;
  }
  logoGenerator.setColor(color);
  const logoSvg = new SVGLogo();
  logoSvg.generateShape(logoGenerator);
  logoSvg.generateText(text, fontColor);
  writeToFile("./dist/logo.svg", logoSvg.generateLogoSVG());
  console.log("Generated logo.svg!");
};

// Defines an initialization function
const init = () => {
  inquirer
    .prompt(questions)
    // Destructure the data for text, fontColor, shape, and color
    .then(({ text, text_color, shape, color }) => {
      generateLogo({ text, fontColor: text_color, shape, color });
    })
    .catch((err) => {
      console.error("Error: ", err);
    });
};

// Defines a function that writes to a file using fs module writeFile function and returns a promise object that resolves to undefined when the file is written to the file system

const writeToFile = (fileName, data) => {
  const dir = "./dist";

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({
        ok: true,
        message: "File created!",
      });
    });
  });
};

// Defines a class that generates the SVG logo
class SVGLogo {
  constructor() {
    this.logo = [];
  }

  // Defines a method that generates the text for the logo
  generateText(text, fontColor) {
    const textElement = `<text x="150" y="100" font-family="Arial" font-size="24" fill="${fontColor}" text-anchor="middle">${text}</text>`;
    this.logo.push(textElement);
  }

  // Defines a method that generates the shape for the logo
  generateShape(shape) {
    this.logo.push(shape.render());
  }

  // Defines a method that generates the SVG logo
  generateLogoSVG() {
    const svg = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">${this.logo.join(
      ""
    )}</svg>`;
    return svg;
  }
}

// Calls the initialization function to start the program
init();
