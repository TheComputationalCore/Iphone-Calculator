// ------------------------------------------------------------
//  iPhone Calculator – DOM-Based Dynamic Interface
// ------------------------------------------------------------

// Get container div already present in index.html
const container = document.querySelector(".container");

// Create display input
const display = document.createElement("input");
display.setAttribute("type", "text");
display.setAttribute("id", "result");
display.setAttribute("class", "display");
display.readOnly = true;
container.append(display);

// Buttons layout map
const buttonLayout = [
  "AC", "DEL", "%", "/",
  "7", "8", "9", "*",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "0", "00", ".", "="
];

// Create button grid container
const buttonGrid = document.createElement("div");
buttonGrid.setAttribute("class", "buttons");
container.append(buttonGrid);

// Dynamically create all buttons
buttonLayout.forEach(value => {
  const btn = document.createElement("button");

  // Operator styling
  if (["AC", "DEL", "%", "/", "*", "-", "+", "="].includes(value)) {
    btn.classList.add("operator");
  }

  btn.setAttribute("data-value", value);
  btn.innerText = value;
  buttonGrid.append(btn);
});

// ------------------------------------------------------------
//  Calculator Logic
// ------------------------------------------------------------

let output = "";
const specialChar = ["%", "*", "/", "-", "+"];

// Safely evaluate calculator expression
function calculate(value) {
  try {
    if (value === "=") {
      if (output === "") return;
      output = eval(output.replace("%", "/100"));
    } else if (value === "AC") {
      output = "";
    } else if (value === "DEL") {
      output = output.toString().slice(0, -1);
    } else {
      // Prevent expression from starting with an operator
      if (output === "" && specialChar.includes(value)) return;

      output += value;
    }

    display.value = output;
  } catch (err) {
    alert("Invalid Expression");
    output = "";
    display.value = output;
  }
}

// ------------------------------------------------------------
//  Click Events
// ------------------------------------------------------------
document.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", e => {
    calculate(e.target.dataset.value);
  });
});

// ------------------------------------------------------------
//  Keyboard Support (Numbers + Operators)
// ------------------------------------------------------------
document.addEventListener("keydown", event => {
  const key = event.key;

  // Allowed keys
  const validKeys = "0123456789+-*/.%";

  if (validKeys.includes(key)) {
    calculate(key);
  }

  if (key === "Enter") calculate("=");
  if (key === "Backspace") calculate("DEL");
  if (key === "Delete") calculate("AC");
});
