const billInput = "350"; 
const partySize = 4;     
const provider = "TeleBirr"; 

const bill = Number(billInput);
let tipPercent = 0.05;

if (bill > 300) {
    tipPercent = 0.10;
}

const tipAmount = bill * tipPercent;
let serviceFee = 0;

switch (provider) {
    case "TeleBirr":
        serviceFee = 5; 
        break;
    case "CBE Birr":
        serviceFee = 7; 
        break;
    default:
        serviceFee = 0;
}

const total = bill + tipAmount + serviceFee;
const perPerson = total / partySize;

console.log(`The total bill is ${total} ETB. With a party size of ${partySize}, each person owes ${perPerson} ETB.`);
