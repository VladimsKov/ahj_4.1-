export default function cardSysValidate(cardNumber) {
  // check pay system: mir
  if (cardNumber.length > 15 && cardNumber.length < 19 && cardNumber[0] === '2') return 5;
  const checkString = cardNumber.slice(0, 2);
  // check pay system: american Express
  if (cardNumber.length === 15 && ['34', '37'].includes(checkString)) return 4;
  if (cardNumber.length === 16) {
    // check pay system: maestro
    if (['50', '56', '57', '58', '63', '67'].includes(checkString)) return 3;
    // check pay system: mastercard
    if (['51', '52', '53', '54', '55'].includes(checkString)) return 2;
    // check pay system: vis/visa electron
    if (cardNumber[0] === '4') return 1;
  }
  return false;
}
