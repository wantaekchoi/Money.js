import { BigNumber } from './BigNumber';

describe('BigNumber', () => {
  it('should add two numbers correctly', () => {
    const num1 = new BigNumber(10);
    const num2 = new BigNumber(20);
    const result = num1.add(num2);
    expect(result.toNumber()).toBe(30);
  });

  it('should subtract two numbers correctly', () => {
    const num1 = new BigNumber(20);
    const num2 = new BigNumber(10);
    const result = num1.subtract(num2);
    expect(result.toNumber()).toBe(10);
  });

  it('should multiply two numbers correctly', () => {
    const num = new BigNumber(10);
    const factor = 2;
    const result = num.multiply(factor);
    expect(result.toNumber()).toBe(20);
  });

  it('should divide two numbers correctly', () => {
    const num = new BigNumber(20);
    const divisor = 2;
    const result = num.divide(divisor);
    expect(result.toNumber()).toBe(10);
  });

  it('should calculate percentage correctly', () => {
    const num = new BigNumber(200);
    const percent = 10;
    const result = num.percentage(percent);
    expect(result.toNumber()).toBe(20);
  });

  it('should allocate amounts correctly', () => {
    const num = new BigNumber(100);
    const ratios = [1, 1, 1];
    const result = num.allocate(ratios);
    expect(result.map((r) => r.toNumber())).toEqual([34, 33, 33]);
  });

  it('should compare numbers correctly', () => {
    const num1 = new BigNumber(10);
    const num2 = new BigNumber(20);
    expect(num1.lessThan(num2)).toBe(true);
    expect(num1.lessThanOrEqual(num2)).toBe(true);
    expect(num2.greaterThan(num1)).toBe(true);
    expect(num2.greaterThanOrEqual(num1)).toBe(true);
    expect(num1.equals(num2)).toBe(false);
  });

  it('should check zero, positive and negative correctly', () => {
    const num1 = new BigNumber(0);
    const num2 = new BigNumber(10);
    const num3 = new BigNumber(-10);
    expect(num1.isZero()).toBe(true);
    expect(num2.isPositive()).toBe(true);
    expect(num3.isNegative()).toBe(true);
  });
});
