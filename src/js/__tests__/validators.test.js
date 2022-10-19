import isValidInn from '../validators';

test.each([
  ['342344', false],
  ['4024007187033864', true],
  ['371880789135825', true],
  ['6304751821845888', true],
  ['5616748202895230', true],
  ['2346518446923484', true],
  ['5108903469695532', false],
  ['3537043594820835', true],
  ['133413', true],
])('cardNumber %s returns %s', (value, expected) => {
  expect(isValidInn(value)).toBe(expected);
});
