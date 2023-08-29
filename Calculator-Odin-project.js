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

function userDisplay(e) {
    const clickedButton = e.target;
    if (clickedButton.value === "delete") {
        if (finalresult) {
            finalresult = finalresult.slice(0, -1);
            display.textContent = finalresult;
        } else if (operator && b) {
            b = b.slice(0, -1);
            display.textContent = display.textContent.slice(0, -1);
        } else if (a) {
            a = a.slice(0, -1);
            display.textContent = display.textContent.slice(0, -1);
        }
        if (display.textContent == '') {
            display.textContent = 0;
        }
    }
    else if (!(clickedButton.classList[1]=="operators") && !operator && clickedButton.classList[1]=="number" && !finalresult) { //to get the first operand;
        console.log(1);
        if (!a) {
            display.textContent = clickedButton.value
        }
        else {
            display.textContent += clickedButton.value;
        }
        a += `${clickedButton.value}`;
    }
    else if (a && b && operator && (clickedButton.classList[1]=="operators")) { //to continue the operation without "=" by directly giving operators  // working
        console.log(2);
        let finalresultt = finalResult(operator, a, b);
        display.textContent = finalresultt + ` ${clickedButton.value}`;
        displayResult.textContent = finalresultt;
        a = finalresultt;
        b = '';
        operator = clickedButton.value;
    }
    else if (finalresult && clickedButton.classList[1]=="number" && !(clickedButton.classList[1]=="operators") && !operator && !b && !(clickedButton.value == "=")) { // to add numbers to finalresult
        console.log(3);
        finalresult += clickedButton.value;
        displayResult.textContent = finalresult; //a // finalresult
    }
    else if (finalresult && clickedButton.classList[1]=="operators") { // to continue operation after final result
        console.log(4);
        a = finalresult;
        b = '';
        operator = clickedButton.value; 
        display.textContent = `${a} ${operator}`;
    }
    else if (clickedButton.classList[1]=="operators") { // to get operators and avoid repeating operators
        console.log(5);
        if (!a) {
            a = "0";
        }
        if (!operator) {
            display.textContent += " " + clickedButton.value;
        }
        else {
            display.textContent = display.textContent.slice(0, -1) + clickedButton.value;
        }
        operator = clickedButton.value;
    }
    else if (clickedButton.value=="=") { // to evaluate the finalresult
        console.log("=");
        if (a && b && operator) {
            finalresult = finalResult(operator, a, b);
            displayResult.textContent = finalresult;
            b = '';
            operator = '';
        }
    }
    else if (a && operator && clickedButton.classList[1]=="number") { // to get second operand
        console.log(6);
        if (!b) {
            display.textContent += (" " + clickedButton.value);
        }
        else {
            display.textContent += clickedButton.value;
        }
        b += `${clickedButton.value}`;
    }
    else if (clickedButton.value = "clear") {
        clearDisplay();
    }
    
}

function handleKeyDown(e) {
    const key = e.key;
    const operators = ['+', '-', '*', '/', '^', '%'];
    if (typeof(+key) == "number") {
    if (a && operator) {
        b += key;
        display.textContent += key;
    }
    else if (key >= '0' && key <= '9') {
        if (!operator && !finalresult) {
            if (!a) {
                display.textContent = key;
            } else {
                display.textContent += key;
            }
            a += key;
        } 
    }
    else if (operators.includes(key)) {
        if (!a) {
            a = '0';
        }
        if (!operator) {
            display.textContent += ` ${key}`;
        } else {
            display.textContent = display.textContent.slice(0, -1) + key;
        }
        operator = key;
    }
    else if (key === '=' || key === 'Enter') {
        if (a && b && operator) {
            finalresult = calculateResult(operator, a, b);
            displayResult.textContent = finalresult;
            b = '';
            operator = '';
        }
    }
    
    else if (key === 'Escape') {
        clearDisplay();
    }
    }
    
}

btns.forEach(btn => btn.addEventListener("click", userDisplay));
document.addEventListener("keydown", function(e) {
    const key = e.key;
    const allowedKeys = /^[0-9+\-*/^%=]$/;

    if (key.match(allowedKeys)) {
        document.querySelector(`[value="${key}"]`).click();
        e.preventDefault();
    } else if (key === "Enter") {
        document.querySelector('[value="="]').click();
        e.preventDefault();
    } else if (key === "Escape") {
        document.querySelector('[value="clear"]').click();
        e.preventDefault();
    }
});