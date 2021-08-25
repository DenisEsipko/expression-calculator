// function eval() {
//     // Do not use eval!!!
//     return;
// }

function expressionCalculator(expr) {

    // разбиваем на части регульркой
    let numArray = expr.match(/([0-9]\d*(\.\d*[0-9])?|0\.\d*[0-9])|[-+/*()]/g);

   // проверка на скобки самоя простая на количество
    checkPairedBrackets(numArray);
    //console.log(numArray)

    numArray.unshift('(');
    //console.log(numArray)
    numArray.push(')');
    //console.log(numArray)
    //numArray.unshift('(');

    let arrayStack = [];
    for (let i = 0; numArray.length > 1; i++) {
        if (numArray[i] === ')') {
            let j = i - 1;
            while (numArray[j] !== '(') {
                j--;
            }
            arrayStack = numArray.splice(j + 1, i - j - 1)
            //console.log(arrayStack)
            let num = basicCalculator(arrayStack);
            numArray.splice(j, 2, num);
            i = 1;
        }
    }
    return Number(numArray);


    function basicCalculator(arr) { //Калькулятор основных операций, не учитывает скобки, считает значение в переменную "а"
        let a = arr[0];
        let b = 0;
        let operation = '';

        for (let i = 1; i < arr.length; i++) {
            if ((['-', '+'].includes(arr[i])) && (arr[i].length == 1)) {
                if (operation == '') {
                    operation = arr[i];
                    b = arr[i + 1];
                } else {
                    a = basicOperation(a, b, operation);
                    operation = arr[i];
                    b = arr[i + 1];
                }
            }
            if (['/', '*'].includes(arr[i])) {
                if (operation == '') {
                    a = basicOperation(a, arr[i + 1], arr[i])
                } else {
                    b = basicOperation(b, arr[i + 1], arr[i])
                }
            }
        }
        if (operation != '') {
            a = basicOperation(a, b, operation);
        }
        return a;
    }


// Проверка соответствия открывающих скобо - закрывающим. тупо на количество
    function checkPairedBrackets(arr) {
        let openBrackets = 0;
        let closeBrackets = 0;
        arr.forEach(element => {
            if (element === '(') {
                openBrackets += 1;
            } else if (element === ')') {
                closeBrackets += 1;
            }
        });
        if (openBrackets !== closeBrackets) {
            throw new Error("ExpressionError: Brackets must be paired");
        }
    }

    function basicOperation(a, b, operation) { //Базовые математические операции с двумя числами
        if ((operation == '/') && (b == Number(0))) {
            throw new Error("TypeError: Division by zero.")
        }
        return operation === '-' ? a - b :
            operation === '+' ? Number(a) + Number(b) :
                operation === '*' ? a * b :
                    operation === '/' ? a / b : new Error("The operator does not exist")
    }

}


// console.log(expressionCalculator('48 + 59 * 86 * 92 * 23')); //10736632.0000;
 //console.log(expressionCalculator('20 - 57 * 12 - ( 58 + 84 * 32 / 27  )')); //-821.5556;
 //console.log(expressionCalculator('20 - ( 5 + 4 )')); //-821.5556;
// console.log(expressionCalculator('20 - 3 + 5'));
//console.log(expressionCalculator("1 / 0")); //


module.exports = {
    expressionCalculator
}