const checkOperator = char => "+-*/".includes(char);

const getText = () => entry.innerHTML;

const getLength = () => getText().length;

const newText = text => entry.innerHTML = text;

const addText = text => newText(getText() + text);

const replaceChar = (char = "") => newText(getText().slice(0, getLength() - 1) + char);

const createButton = (text, className, func = addInEntry) => Object.assign(document.createElement("button"), { className: `d-grid btn round ${className}`, innerHTML: text, onclick: () => func(text) });

const delText = () => newText((getLength() == 1)?0:replaceChar());

const findResult = () => {
    try {
        newText(eval(getText()));
        if (getText() == "Infinity") throw e
    } catch (e) {
        newText("Error");
    }
}

const addInEntry = char => {
    if (char == "AC") newText(0);
    else if (char == "DEL") delText();
    else if (["0", "Error"].includes(getText()) && !checkOperator(char)) newText(char);
    else if(checkOperator(char) && checkOperator(getText()[getLength() - 1])) replaceChar(char);
    else addText(char);
}

const containers = document.getElementById("numpad").children;
const entry = document.getElementById("entry");

const numpadKeys = [
    [Array.from("789456123.0"), ""],
    [Array.from("/*-+"), "operators"],
    [["DEL", "AC"], "clearings"]
]

numpadKeys.forEach(([keys, cName], ind) => keys.forEach(e => containers[ind].append(createButton(e, cName))));

containers[0].append(createButton("=", "equals", findResult));
