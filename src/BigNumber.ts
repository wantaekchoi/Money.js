import Big from 'big.js';

export class BigNumber {
  private readonly value: Big;

  constructor(value: number | string | Big) {
    this.value = new Big(value);
  }

  add(other: BigNumber): BigNumber {
    return new BigNumber(this.value.plus(other.value));
  }

  subtract(other: BigNumber): BigNumber {
    return new BigNumber(this.value.minus(other.value));
  }

  multiply(factor: number): BigNumber {
    return new BigNumber(this.value.mul(factor));
  }

  divide(divisor: number): BigNumber {
    return new BigNumber(this.value.div(divisor));
  }

  percentage(percent: number): BigNumber {
    return this.multiply(percent / 100);
  }

  allocate(ratios: number[]): BigNumber[] {
    const total = ratios.reduce((sum, ratio) => sum + ratio, 0);
    let remainder = this.value;
    const results = ratios.map((ratio) => {
      const share = this.value.mul(ratio).div(total).round(0, 0);
      remainder = remainder.minus(share);
      return new BigNumber(share);
    });
    for (let i = 0; remainder.gt(0); i++) {
      results[i] = results[i].add(new BigNumber(1));
      remainder = remainder.minus(1);
    }
    return results;
  }

  equals(other: BigNumber): boolean {
    return this.value.eq(other.value);
  }

  lessThan(other: BigNumber): boolean {
    return this.value.lt(other.value);
  }

  lessThanOrEqual(other: BigNumber): boolean {
    return this.value.lte(other.value);
  }

  greaterThan(other: BigNumber): boolean {
    return this.value.gt(other.value);
  }

  greaterThanOrEqual(other: BigNumber): boolean {
    return this.value.gte(other.value);
  }

  isZero(): boolean {
    return this.value.eq(0);
  }

  isPositive(): boolean {
    return this.value.gt(0);
  }

  isNegative(): boolean {
    return this.value.lt(0);
  }

  toNumber(): number {
    return Number(this.value);
  }

  toString(): string {
    return this.value.toString();
  }
}
