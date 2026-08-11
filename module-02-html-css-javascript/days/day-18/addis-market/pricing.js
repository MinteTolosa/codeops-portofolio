export function withVat(price, vatRate = 0.15) {
  return price + price * vatRate;
}

export function format(amount) {
  return `${amount.toFixed(2)} ETB`;
}