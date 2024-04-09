const display = document.getElementById("display");
const form = document.getElementById("calc_form");
const operand_btns = document.querySelectorAll("button[data-type=operand]");
const operator_btns = document.querySelectorAll("button[data-type=operator]");

form.addEventListener("submit", e => {
  e.preventDefault();
});

let is_operator = false;
let equation = [];

const remove_active = () => {
  operator_btns.forEach(btn => {
    btn.classList.remove("active");
  });
};

operand_btns.forEach(btn => {
  btn.addEventListener("click", e => {
    remove_active();
    if (display.value == "0") {
      display.value = e.target.value;
    } else if (is_operator) {
      is_operator = false;
      display.value = e.target.value;
    } else if (display.value.includes(".")) {
      display.value = display.value + "" + e.target.value.replace(".", "");
    } else {
      display.value = display.value + "" + e.target.value;
    }
  });
});

operator_btns.forEach(btn => {
  btn.addEventListener("click", e => {
    remove_active();
    e.currentTarget.classList.add("active");

    switch (e.target.value) {
      case "%":
        display.value = parseFloat(display.value) / 100;
        break;
      case "invert":
        display.value = parseFloat(display.value) * -1;
        break;
      case "=":
        equation.push(display.value);
        display.value = eval(equation.join(""));
        equation = [];
        break;
      default:
        let last_item = equation[equation.length - 1];
        if (e.target.value === "-" && last_item === "-") {
          equation.pop();
        } else if (["/", "*", "+", "-"].includes(last_item) && is_operator) {
          equation[equation.length - 1] = e.target.value;
        } else {
          equation.push(display.value);
          equation.push(e.target.value);
        }
        is_operator = true;
        break;}

  });
});