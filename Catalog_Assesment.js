function decodeValue(value, base) {
    return parseInt(value, base);
}

function lagrangeInterpolation(xPoints, yPoints, x) {
    let totalSum = 0;
    const n = xPoints.length;
    
    for (let i = 0; i < n; i++) {
        let xi = xPoints[i];
        let yi = yPoints[i];
        let term = yi;
        
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                let xj = xPoints[j];
                term *= (x - xj) / (xi - xj);
            }
        }
        
        totalSum += term;
    }
    
    return totalSum;
}

function findConstantTerm(xPoints, yPoints) {
    return lagrangeInterpolation(xPoints, yPoints, 0);
}

function main() {
    const jsonInput = `
    {
        "keys": {
            "n": 4,
            "k": 3
        },
        "1": {
            "base": "10",
            "value": "4"
        },
        "2": {
            "base": "2",
            "value": "111"
        },
        "3": {
            "base": "10",
            "value": "12"
        },
        "6": {
            "base": "4",
            "value": "213"
        }
    }`;

    const data = JSON.parse(jsonInput);
    
    const xPoints = [];
    const yPoints = [];
    
    for (const key in data) {
        if (key === 'keys') {
            continue;
        }
        
        const { base, value } = data[key];
        const decodedValue = decodeValue(value, parseInt(base, 10));
        xPoints.push(parseInt(key, 10));
        yPoints.push(decodedValue);
    }
    
    const constantTerm = Math.round(findConstantTerm(xPoints, yPoints));
    
    console.log(`The constant term of the polynomial is: ${constantTerm}`);
}

main();
