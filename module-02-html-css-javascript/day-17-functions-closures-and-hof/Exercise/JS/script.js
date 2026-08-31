"use strict";

const subtotal = (...prices) => {
  return prices.reduce((total, current) => (total += current), 0);
};


const discountBy = (rate = 0.1) => {
  return (price) => {
    return price - price * rate;
  };
};



const withVat = (priceBeforeVat) => priceBeforeVat * 1.15;


const toETB = (price) => `${price.toFixed(2)} ETB`;


function makeReceiptMaker() {
  let orderNo = 0;
  const memberOff = discountBy();

  return function (...items) {
    ++orderNo;
    const grossPrice = subtotal(...items);
    const netPrice = withVat(memberOff(grossPrice));
    return `#${orderNo}: ${toETB(netPrice)}`;
  };
}

const receipt = makeReceiptMaker();
console.log(receipt(220, 180, 120));
console.log(receipt(140, 60));
console.log(receipt(100, 200, 300, 400));
console.log(receipt(100, 200, 300));