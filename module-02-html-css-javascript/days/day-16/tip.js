const billInput = "350"; 
const partySize = 4;     
const provider = "TeleBirr"; 

const bill = Number(billInput);


const receipt = bill > 300 ? 0.10 : 0.05;
// let tipPercent = 0.05;
// if (bill > 300) {
//     tipPercent = 0.10;
// }

const tipAmount = bill * 0.05;
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

console.log(`The bill is: ${bill} ETB`)
console.log(`The tipAmount is: ${tipAmount} ETB`)
console.log(`The total bill is: ${total} ETB`)
console.log(`Each person's share: ${perPerson} ETB`)

// console.log(`The total bill is ${total} ETB. With a party size of ${partySize}, each person owes ${perPerson} ETB.`);
