// LuhnAlgorithm
export default function isValidInn(cardNumber) {
  let i = 0;
  const l = cardNumber.length - 2;
  let sum = Number(cardNumber[l + 1]);
  while (i <= l) {
    if (i % 2 === 0) {
      let d = cardNumber[l - i] * 2;
      if (d > 9) d -= 9;
      sum += d;
    } else sum += Number(cardNumber[l - i]);
    i += 1;
  }
  return sum % 10 === 0;
}
