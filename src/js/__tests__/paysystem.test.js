import cardSysValidate from '../pay.system.check';

test.each([
  ['342344', false],
  ['4024007187033864', 1],
  ['371880789135825', 4],
  ['6304751821845888', 3],
  ['5616748202895230', 3],
  ['2346518446923484', 5],
  ['5108903469695535', 2],
  ['3537043594820835', false],
])('cardNumber %s returns %s', (value, expected) => {
  expect(cardSysValidate(value)).toBe(expected);
});
