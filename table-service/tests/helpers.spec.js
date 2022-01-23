import formatPrice from '../src/helpers/formatPrice';

test('Should return the price formatted', () => {
  expect(formatPrice(12.34)).toBe(12.34);
  expect(formatPrice(12.345)).toBe(12.35);
  expect(formatPrice(12.3456)).toBe(12.35);
});
