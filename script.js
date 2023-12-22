const addInEntry = text => {
    if (entry.innerText == "Error") allClear();
    if (text == "DEL") delText();
    else if (text == "AC") allClear();
    else if (entry.innerText == "0") { if (!"/*-+".includes(text)) entry.innerText = text; }
    else if (entry.innerText.length < 15) entry.innerText += text;
}
const delText = () => {
    entry.innerText = entry.innerText.slice(0, entry.innerText.length - 1);
    if (entry.innerText.length == 0) allClear();
}

const allClear = () => entry.innerText = 0;

const findResult = () => {
    try { entry.innerText = eval(entry.innerText); if(entry.innerText.includes("Infinity")) throw e}
    catch (e) { entry.innerText = "Error"; }
}

const createButton = (text, className, func = addInEntry) => Object.assign(document.createElement("button"), { className: `d-grid btn round ${className}`, innerHTML: text, onclick: () => func(text) });

const containers = document.getElementById("numpad").children;
const entry = document.getElementById("entry");

[[Array.from("789456123.0"), ""], [Array.from("/*-+"), "operators"], [["DEL", "AC"], "clearings"]].forEach(([keys, className], index) => keys.forEach(e => containers[index].append(createButton(e, className))));

containers[0].append(createButton("=", "equals", findResult));