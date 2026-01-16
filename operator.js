function addNumbers() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value); 
    const sum = num1 + num2;
    document.getElementById('resultValue').textContent = `${num1} + ${num2} = ${sum}`;
    document.getElementById('result').classList.add('show');
}

function subtractNumbers(){
    const num1 = parseFloat(document.getElementById('num3').value);
    const num2 = parseFloat(document.getElementById('num4').value);
    const difference = num1 - num2;
    document.getElementById('resultValue1').textContent = `${num1} - ${num2} = ${difference}`;
    document.getElementById('result2').classList.add('show');
}

function multiplyNumbers(){
    const num1 = parseFloat(document.getElementById('num5').value);
    const num2 = parseFloat(document.getElementById('num6').value);
    const product = num1 * num2;
    document.getElementById('resultValue2').textContent = `${num1} * ${num2} = ${product}`;
    document.getElementById('result3').classList.add('show');
}

function divisionNumbers(){
    const num1 = parseFloat(document.getElementById('num7').value);
    const num2 = parseFloat(document.getElementById('num8').value);
    const quotient = num1 / num2;
    document.getElementById('resultValue3').textContent = `${num1} / ${num2} = ${quotient}`;
    document.getElementById('result4').classList.add('show');
}