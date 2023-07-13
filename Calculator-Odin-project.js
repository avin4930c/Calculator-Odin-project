let display = document.querySelector("#calculator-display");
let displayResult = document.querySelector("#calculator-result");
btns = document.querySelectorAll(".buttons");
let a = '', b = '', operator, finalresult;

const add = function(a, b) {
    return parseInt(a) + parseInt(b);
  };
  
  const subtract = function(a, b) {
      return parseInt(a) - parseInt(b);
  };
  
  const multiply = function(a, b) {
    return parseInt(a) * parseInt(b);
  }
  
  const divide = function(a, b) {
    return parseInt(a) / parseInt(b);
  }

  const power = function(a, b) {
      return parseInt(a) ** parseInt(b);
  };
  const mod = function(a, b) {
    return parseInt(a) % parseInt(b);
  }

function finalResult(operator, a, b) {
    switch(operator) {
        case "+":
            return add(a, b).toString();
        case "-":
            return subtract(a, b).toString();
        case "*":
            return multiply(a, b).toString();
        case "/":
            return divide(a, b).toString();
        case "^":
            return power(a, b).toString();
        case "%":
            return mod(a, b).toString();
    }
}

function clearDisplay() {
    a = b = operator = finalresult = '';
    display.textContent = 0;
    displayResult.textContent = '';
}
function userDisplay() {
    btns.forEach(btn => btn.addEventListener("click", function(e) {
        if (!(this.classList[1]=="operators") && !operator && this.classList[1]=="number" && !finalresult) { //to get the first operand;
            console.log(1);
            if (!a) {
                display.textContent = this.value
            }
            else {
                display.textContent += this.value;
            }
            a += `${this.value}`;
        }
        else if (a && b && operator && (this.classList[1]=="operators")) { //to continue the operation without "=" by directly giving operators  // working
            console.log(2);
            let finalresultt = finalResult(operator, a, b);
            display.textContent = finalresultt + ` ${this.value}`;
            displayResult.textContent = finalresultt;
            a = finalresultt;
            b = '';
            operator = this.value;
        }
        else if (finalresult && this.classList[1]=="number" && !(this.classList[1]=="operators") && !operator && !b) { // to add numbers to finalresult
            console.log(3);
            finalresult += this.value;
            displayResult.textContent = finalresult; //a // finalresult
        }
        else if (finalresult && this.classList[1]=="operators") { // to continue operation after final result
            console.log(4);
            a = finalresult;
            b = '';
            operator = this.value; 
            display.textContent = `${a} ${operator}`;
        }
        else if (this.classList[1]=="operators") { // to get operators and avoid repeating operators
            console.log(5);
            if (!a) {
                a = "0";
            }
            if (!operator) {
                display.textContent += " " + this.value;
            }
            else {
                display.textContent = display.textContent.slice(0, -1) + this.value;
            }
            operator = this.value;
        }
        else if (this.value=="=") { // to evaluate the finalresult
            console.log("=");
            if (a && b && operator) {
                finalresult = finalResult(operator, a, b);
                displayResult.textContent = finalresult;
                b = '';
                operator = '';
            }
        }
        else if (a && operator && this.classList[1]=="number") { // to get second operand
            console.log(6);
            if (!b) {
                display.textContent += (" " + this.value);
            }
            else {
                display.textContent += this.value;
            }
            b += `${this.value}`;
        }
        else if (this.value = "clear") {
            clearDisplay();
        }
        
    }))
}
userDisplay();

