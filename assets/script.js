// Theme Changer Function
document.getElementById("theme_changer").addEventListener("change", (e) => {
    const {value} = e.target
    const body = document.getElementById("body")
    switch (parseInt(value)) {
        case 2:
            body.classList.remove("theme3")
            body.classList.add("theme2")
            break;
        case 3:
            body.classList.remove("theme2")
            body.classList.add("theme3")
            break;
        default:
            body.classList.remove("theme2", "theme3")
            break;
    }
})


const calculator = {
    firstOperand: null,
    operator: null,
    secondOperand: false,
    valueToDisplay: '0'
}

let displayValue = () => {
    const display = document.getElementById("display")
    display.value = calculator.valueToDisplay
}

let inputDigit = (value) => {
    const {valueToDisplay, secondOperand} = calculator
    if(secondOperand == false) {
        calculator.valueToDisplay = valueToDisplay === "0" ? value : valueToDisplay + value
    }else{
        calculator.secondOperand = false
        calculator.valueToDisplay = value
    }
}

let inputDecimal = (dot) => {
    const {valueToDisplay} = calculator
    if(!valueToDisplay.includes(dot)) {
        calculator.valueToDisplay = valueToDisplay + dot
    }
}

let handleOperator = (key) => {
    const {firstOperand, valueToDisplay} = calculator
    const inputValue = parseFloat(valueToDisplay)
    if(firstOperand == null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue
    }
    calculator.operator = key
    calculator.secondOperand = true
}

const keysContainer = document.querySelector(".keys-container")
keysContainer.addEventListener("click", (e) => {
    const {target} = e
    if(!target.matches("button")) {
        return
    }
    if(target.classList.contains("decimal")) {
        inputDecimal(target.value)
        displayValue()
        return
    }
    if(target.classList.contains("clear")) {
        console.log("All clear: " + target.value);
        return
    }
    if(target.classList.contains("delete")) {
        console.log(("Del: " + target.value));
        return
    }
    if(target.classList.contains("operator")) {
        handleOperator(target.value)
        return
    }
    if(target.classList.contains("keys")) {
        inputDigit(target.value)
        displayValue()
        return
    }
})


displayValue()