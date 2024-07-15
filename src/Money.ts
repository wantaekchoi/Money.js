import { BigNumber } from './BigNumber';
import { CurrencyInfo } from './CurrencyInfo';

export class Money {
  private readonly amount: BigNumber;
  private readonly currencyInfo: CurrencyInfo;

  constructor(amount: number | string, currencyInfo: CurrencyInfo) {
    this.amount = new BigNumber(amount);
    this.currencyInfo = currencyInfo;
  }

  getCurrencyCode(): string {
    return this.currencyInfo.getCurrencyCode();
  }

  getLocaleCode(): string {
    return this.currencyInfo.getLocaleCode();
  }

  convert(rate: number, newCurrencyCode: string): Money {
    const newAmount = this.amount.multiply(rate);
    const newCurrencyInfo = new CurrencyInfo(
      newCurrencyCode,
      this.getLocaleCode(),
    );
    return new Money(newAmount.toString(), newCurrencyInfo);
  }

  add(other: Money): Money {
    this.assertSameCurrency(other);
    const newAmount = this.amount.add((other as Money).amount);
    return new Money(newAmount.toString(), this.currencyInfo);
  }

  subtract(other: Money): Money {
    this.assertSameCurrency(other);
    const newAmount = this.amount.subtract((other as Money).amount);
    return new Money(newAmount.toString(), this.currencyInfo);
  }

  multiply(factor: number): Money {
    const newAmount = this.amount.multiply(factor);
    return new Money(newAmount.toString(), this.currencyInfo);
  }

  divide(divisor: number): Money {
    const newAmount = this.amount.divide(divisor);
    return new Money(newAmount.toString(), this.currencyInfo);
  }

  percentage(percent: number): Money {
    const newAmount = this.amount.percentage(percent);
    return new Money(newAmount.toString(), this.currencyInfo);
  }

  allocate(ratios: number[]): Money[] {
    const allocatedAmounts = this.amount.allocate(ratios);
    return allocatedAmounts.map(
      (amount) => new Money(amount.toString(), this.currencyInfo),
    );
  }

  equalsTo(other: Money): boolean {
    return (
      this.amount.equals((other as Money).amount) &&
      this.getCurrencyCode() === other.getCurrencyCode()
    );
  }

  equals(other: Money): boolean {
    return this.equalsTo(other);
  }

  lessThan(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.amount.lessThan((other as Money).amount);
  }

  lessThanOrEqual(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.amount.lessThanOrEqual((other as Money).amount);
  }

  greaterThan(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.amount.greaterThan((other as Money).amount);
  }

  greaterThanOrEqual(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.amount.greaterThanOrEqual((other as Money).amount);
  }

  isZero(): boolean {
    return this.amount.isZero();
  }

  isPositive(): boolean {
    return this.amount.isPositive();
  }

  isNegative(): boolean {
    return this.amount.isNegative();
  }

  toFormat(): string {
    return this.currencyInfo.format(this.amount.toNumber());
  }

  toNumber(): number {
    return this.amount.toNumber();
  }

  private assertSameCurrency(other: Money): void {
    if (this.getCurrencyCode() !== other.getCurrencyCode()) {
      throw new Error('Currencies must be the same');
    }
  }
}
