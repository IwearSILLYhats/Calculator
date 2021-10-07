//Set three variables, one for the current total, one for the current operator, and one for the current input.

let total = "";
let currentOperator;
let currentVariable = "";

//Add variables for each of the keys, by number, operator, and then special cases for decimal, negative, clear, back, and equals.


const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

const previous = document.getElementById("previous");
const current = document.getElementById("current");

let decimal = document.getElementById("decimal");
let negative = document.getElementById("negative");
let clear = document.getElementById("clear");
let back = document.getElementById("back");
let equals = document.getElementById("equals");

// set event listeners

numbers.forEach(element => element.addEventListener("click", () => {
    currentVariable = currentVariable.concat(element.textContent);
    current.textContent = currentVariable;
}
));

operators.forEach(element => element.addEventListener("click", () => {
    if(total === ""){
        total = currentVariable;
        currentVariable = "";
        current.textContent = "";
    }
    currentOperator = element.textContent;
    previous.textContent = `${total} ${currentOperator}`
    }));

decimal.addEventListener("click", () => 
    {if(currentVariable.indexOf(".") == -1)
        {
            currentVariable = currentVariable.concat(".");
            current.textContent = currentVariable;
        }
    });

negative.addEventListener("click", () => {
    if(currentVariable.indexOf("-") == -1){
        currentVariable = "-" + currentVariable;
        current.textContent = currentVariable;
    }
    else{
        currentVariable = currentVariable.substring(1, currentVariable.length);
        current.textContent = currentVariable;
    }
});

clear.addEventListener("click", () => {
    total = "";
    currentOperator = "";
    currentVariable = "";
    current.textContent = currentVariable;
    previous.textContent = " ";
});

back.addEventListener("click", () => {
    currentVariable = currentVariable.substring(0, currentVariable.length - 1);
    current.textContent = currentVariable;
});

equals.addEventListener("click", () => equal());


//Default state has all three variables blank. Typing any number changes the current variable. Then, if there is no current total, hitting an operator sets the current total to the current variable, clears the current variable, and sets the current operator as whichever operator you pressed.

function add(){
total = parseFloat(total) + parseFloat(currentVariable);
currentVariable = "";
currentOperator = "";

};

function subtract(){
    total = parseFloat(total) - parseFloat(currentVariable);
    currentVariable = "";
    currentOperator = "";
};

function multiply(){
    total = parseFloat(total) * parseFloat(currentVariable);
    currentVariable = "";
    currentOperator = "";
};

function divide(){
    total = parseFloat(total) / parseFloat(currentVariable);
    currentVariable = "";
    currentOperator = "";
};

function equal(){
    if(currentOperator == "/" && currentVariable == "0"){
        current.textContent = "Dividing by zero is forbidden.";
        currentVariable = "";
        currentOperator = "";
        total = "";
    }
    else{
            if(currentOperator == "+"){
                add();
            }
            else if(currentOperator == "-"){
                subtract();
            }
            else if(currentOperator == "x"){
                multiply();
            }
            else if(currentOperator == "/"){
                divide();
            }


    }
    previous.textContent = total;
};


//Finally, if there IS a current total, pressing an operator just changes the current operator until you press equals, which then runs the math between the total, the operator, and the variable, sets the total as the result, then clears the operator and variable.

//extra credit - adding keyboard support

document.addEventListener("keydown", (num) => {
        if(num.key >= 0 && num.key <= 9){
        currentVariable = currentVariable.concat(num.key);
        current.textContent = currentVariable;
        };
    }
);

document.addEventListener("keydown", oper => {
    if(oper.key === "+" || oper.key === "-" || oper.key === "*" || oper.key === "/"){
            if(total === ""){
                total = currentVariable;
                currentVariable = "";
                current.textContent = "";
            }
    currentOperator = oper.key;
    previous.textContent = `${total} ${currentOperator}`
}});

document.addEventListener("keydown", (deci) => 
    {
        if(deci.key === "."){
        if(currentVariable.indexOf(".") == -1)
        {
            currentVariable = currentVariable.concat(".");
            current.textContent = currentVariable;
        }
    }
    });

document.addEventListener("keydown", (back) => {
    if(back.key === "Backspace"){
    currentVariable = currentVariable.substring(0, currentVariable.length - 1);
    current.textContent = currentVariable;
    }
});

document.addEventListener("keydown", (eq) => {
    if(eq.key === "Enter"){
    equal()
    }
});