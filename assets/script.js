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
    const {valueToDisplay, secondOperand} = calculator
    if(secondOperand) {
        calculator.valueToDisplay = "0" + dot
        calculator.secondOperand = false
        return
    }
    if(!valueToDisplay.includes(dot)) {
        calculator.valueToDisplay = valueToDisplay + dot
        return
    }
}

let calculate = (firstOperand, operator, secondOperand) => {
    switch (operator) {
        case "+":
            return firstOperand + secondOperand
            break;
        case "-":
            return firstOperand - secondOperand
            break;
        case "/":
            return firstOperand / secondOperand
            break;
        case "x":
            return firstOperand * secondOperand
            break;
        default:
            return secondOperand
            break;
    }
}

let handleOperator = (key) => {
    const {firstOperand, valueToDisplay, operator, secondOperand} = calculator
    const inputValue = parseFloat(valueToDisplay)
    if(operator && secondOperand) {
        calculator.operator = key
        return
    }
    if(operator) {
        result = calculate(firstOperand, operator, inputValue)
        calculator.valueToDisplay = `${parseFloat(result.toFixed(7))}`
        calculator.firstOperand = result
    }
    if(firstOperand == null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue
    }
    calculator.operator = key
    calculator.secondOperand = true
}

let reset = () => {
    calculator.firstOperand = null
    calculator.operator = null
    calculator.secondOperand = false
    calculator.valueToDisplay = "0"
}

let del = (value) => {
    if(calculator.valueToDisplay != "0" && calculator.firstOperand == null) {
        calculator.valueToDisplay = value.slice(0, -1)
        console.log(calculator);
        return
    }
    if(calculator.firstOperand) {
        calculator.valueToDisplay = value.slice(0, -1)
        calculator.firstOperand = null
        calculator.operator = null
        calculator.secondOperand = false
        console.log(calculator);
        return
    }
    return
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
        reset()
        displayValue()
        return
    }
    if(target.classList.contains("delete")) {
        del(calculator.valueToDisplay)
        displayValue()
        return
    }
    if(target.classList.contains("operator")) {
        handleOperator(target.value)
        displayValue()
        return
    }
    if(target.classList.contains("keys")) {
        inputDigit(target.value)
        displayValue()
        return
    }
})


displayValue()