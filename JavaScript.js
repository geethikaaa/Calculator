function reverseString(str) {
    let newString = [];
    for (let i = str.length - 1; i >= 0; i--) {
        newString.push(str[i]);
    }
    return newString;
}

function isOperator(c) {
    if (c == '+' || c == '-' || c == '*' || c == '/' || c == '^' || c == '%') {
        return true;
    }
    else {
        return false;
    }
}
function precedence(c) {
    if (c == '^')
        return 3;
    else if (c == '*' || c == '/' || c=='%')
        return 2;
    else if (c == '+' || c == '-')
        return 1;
    else
        return -1;
}
function InfixToPrefix(s, infix) {
    prefix=[];
    infix = reverseString(infix)
    for(i = 0; i < infix.length; i++) {
        if (infix[i] == '(') {
            infix[i] = ')';
        }
        else if (infix[i] == ')') {
            infix[i] = '(';
        }
    }
    for(i = 0; i < infix.length; i++) {
        if (!isOperator(infix[i])) {
            prefix.push(infix[i]);
        }
        else if (infix[i] == '(') {
            s.unshift(infix[i]);
        }
        else if (infix[i] == ')') {
            while (s.length && s[0] != '(') {
                prefix.push(s[0]);
                s.shift();
            }
            if (s[0] == '(') {
                s.shift();
            }
        }
        else if (isOperator(infix[i])) {
            if (!s.length) {
                s.unshift(infix[i]);
            }
            else {
                if (precedence(infix[i]) > precedence(s[0])) {
                    s.unshift(infix[i]);
                }
                else if ((precedence(infix[i]) == precedence(s[0])) && (infix[i] == '^')) {
                    while ((precedence(infix[i]) == precedence(s[0])) && (infix[i] == '^')) {
                        prefix.push(s[0]);
                        s.shift();
                    }
                    s.unshift(infix[i]);
                }
                else if (precedence(infix[i]) == precedence(s[0])) {
                    s.unshift(infix[i]);
                }
                else {
                    while ((s.length) && (precedence(infix[i]) < precedence(s[0]))) {
                        prefix.push(s[0]);
                        s.shift();
                    }
                    s.unshift(infix[i]);
                }
            }
        }
    }
    while (s.length) {
        prefix.push(s[0]);
        s.shift();
    }
    prefix = reverseString(prefix)
    return prefix;
}

function evaluate(a,b,op) {
    if(op=='+')         return a+b;
    else if(op=='-')    return a-b;
    else if(op=='*')    return a*b;
    else if(op=='/')    return a/b;
    else if(op=='^')    return Math.pow(a,b);
    else if(op=='%')    return a%b;
}

function evaluatePrefix(arr) {
    let s = [];
    console.log(arr)
    for(let i = arr.length-1;i>=0;i--) {
        if(arr[i]=="") continue;
        if(!isOperator(arr[i])) {
            s.push(arr[i])
        }
        else {
            let num1,num2;
            if(s.length>=2) {
                num1 = parseFloat(s.pop());
                num2 = parseFloat(s.pop());
                let temp = evaluate(num1,num2,arr[i])
                s.push(temp)
            }
            else {
                if(arr[i]=='-') {
                    s.push(-1*s.pop())
                }
            }
            console.log(arr[i])
        }
    }
    return s[0];
}

function main(infix) {
    prefix = [], temp = [];
    str = ""
    for(let i=0;i<infix.length;i++) {
        if(isOperator(infix[i])) {
            temp.push(str)
            temp.push(infix[i])
            str="";
        }
        else {
            str += infix[i];
        }
    }
    temp.push(str)
    infix = temp;
    var stack = []
    prefix = InfixToPrefix(stack, infix);
    return evaluatePrefix(prefix)

}

function command(op) {  // operand or operator -> op
    let val = document.getElementById('textbox').innerHTML;
    if(op=='del') {
        document.getElementById('textbox').innerHTML = val.slice(0,-1);
    }
    else if(op=='=') {
        let ans = main(val);
        if(ans=="NaN") {
            ans = "Infinity";
        }
        document.getElementById('textbox').innerHTML = ans;
    }
    else if(op=='c') {
        document.getElementById('textbox').innerHTML = "";
    }
    else {
        document.getElementById('textbox').innerHTML += op;
    }
}