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
    //when user enter a key digit, remove operator sign on display 
    document.getElementById("operator_span").innerHTML = ""
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
        case "*":
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
    //Display operator on display
    if (key != "Enter") document.getElementById("operator_span").innerHTML = key
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
        return
    }
    if(calculator.firstOperand) {
        calculator.valueToDisplay = value.slice(0, -1)
        calculator.firstOperand = null
        calculator.operator = null
        calculator.secondOperand = false
        return
    }
    return
}

const calcApp = (e) => {
    if(e instanceof KeyboardEvent) {
        var value = e.key
    }else{
        const {target} = e
        var value = target.value
        if(!target.matches("button")) {
            return
        }
    }
    switch (value) {
        case "+":
        case "-":
        case "/":
        case "*":
        case "Enter":
            handleOperator(value)
            break
        case ".":
            inputDecimal(value)
            break
        case "c":
            reset()
            break
        case "Delete":
            del(calculator.valueToDisplay)
            break
        default:
            if(Number.isInteger(parseFloat(value))){
                inputDigit(value)
                break
            }else{
                const stringValue = toString(value)
                console.log(stringValue);
            }
    }
    displayValue()
}

document.querySelector(".keys-container").addEventListener("click", calcApp)
document.addEventListener("keydown", calcApp)