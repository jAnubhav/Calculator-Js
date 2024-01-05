const checkOperator = char => "+-*/".includes(char);

const getText = () => entry.innerHTML;

const getLength = () => getText().length;

const newText = text => entry.innerHTML = text;

const addText = text => entry.innerHTML += text;

const replaceChar = (char = "") => newText(getText().slice(0, getLength() - 1) + char);

const delText = () => (getLength() == 1) ? newText(0) : replaceChar();

const createNode = (label, className, options = {}) => Object.assign(document.createElement(label), { className: className, ...options });

const createDiv = (className, id, ...child) => {
    let div = createNode("div", className, { id: id });
    div.append(...child)
    return div
}

const createButton = (text, className, func = addInEntry) => createNode("button", `d-grid btn round ${className}`, { innerHTML: text, onclick: () => func(text) });

const findResult = () => {
    try {
        newText(Math.round((eval(getText()) + Number.EPSILON) * 1000) / 1000);
        if (getText() == "Infinity") throw e
    } catch (e) {
        newText("Error");
    }
}

const addInEntry = char => {
    if (char == "AC") newText(0);
    else if (char == "DEL") delText();
    else if (["0", "Error"].includes(getText())) (checkOperator(char)) ? {} : newText(char);
    else if (checkOperator(char) && checkOperator(getText()[getLength() - 1])) replaceChar(char);
    else addText(char);
}

(() => document.body.appendChild(
        createDiv("spacing", "container",
            createDiv("round", "title",
                createNode("p", "", { innerHTML: "Calc" }),
                createNode("i", "fas fa-calculator")
            ),
            createDiv("round", "entry-box",
                createNode("p", "d-grid", { id: "entry", innerHTML: 0 })
            ),
            createDiv("d-grid round", "numpad",
                createDiv("d-grid", "numbers"),
                createDiv("d-grid", "operators"),
                createDiv("d-grid", "clearings")
            )
        )
    )
)()

const containers = document.getElementById("numpad").children;
const entry = document.getElementById("entry");

[[Array.from("789456123.0"), ""], [Array.from("/*-+"), "operators"], [["DEL", "AC"], "clearings"]].forEach(([keys, className], index) => keys.forEach(e => containers[index].append(createButton(e, className))));

containers[0].append(createButton("=", "equals", findResult));
