import { Money } from './Money';
import { CurrencyInfo } from './CurrencyInfo';

describe('Money', () => {
  let currencyInfoUSD: CurrencyInfo;
  let currencyInfoEUR: CurrencyInfo;

  beforeEach(() => {
    currencyInfoUSD = new CurrencyInfo('USD', 'en-US');
    currencyInfoEUR = new CurrencyInfo('EUR', 'en-GB');
  });

  describe('constructor', () => {
    it('should create a Money object with amount and currency info', () => {
      // Given
      const amount = '100.50';

      // When
      const money = new Money(amount, currencyInfoUSD);

      // Then
      expect(money.toFormat()).toBe('$100.50');
    });
  });

  describe('getCurrencyCode', () => {
    it('should return the currency code', () => {
      // Given
      const money = new Money('100.50', currencyInfoUSD);

      // When
      const currencyCode = money.getCurrencyCode();

      // Then
      expect(currencyCode).toBe('USD');
    });
  });

  describe('getLocaleCode', () => {
    it('should return the locale code', () => {
      // Given
      const money = new Money('100.50', currencyInfoUSD);

      // When
      const localeCode = money.getLocaleCode();

      // Then
      expect(localeCode).toBe('en-US');
    });
  });

  describe('convert', () => {
    it('should convert the amount to a new currency', () => {
      // Given
      const moneyUSD = new Money('100.50', currencyInfoUSD);

      // When
      const moneyEUR = moneyUSD.convert(0.9, 'EUR');

      // Then
      expect(moneyEUR.toFormat()).toBe('€90.45');
    });
  });

  describe('add', () => {
    it('should add two Money objects with the same currency', () => {
      // Given
      const money1 = new Money('100.50', currencyInfoUSD);
      const money2 = new Money('50.25', currencyInfoUSD);

      // When
      const result = money1.add(money2);

      // Then
      expect(result.toFormat()).toBe('$150.75');
    });

    it('should throw error when adding Money objects with different currencies', () => {
      // Given
      const moneyUSD = new Money('100.50', currencyInfoUSD);
      const moneyEUR = new Money('50.25', currencyInfoEUR);

      // When, Then
      expect(() => moneyUSD.add(moneyEUR)).toThrow(
        'Currencies must be the same',
      );
    });
  });

  describe('subtract', () => {
    it('should subtract two Money objects with the same currency', () => {
      // Given
      const money1 = new Money('100.50', currencyInfoUSD);
      const money2 = new Money('50.25', currencyInfoUSD);

      // When
      const result = money1.subtract(money2);

      // Then
      expect(result.toFormat()).toBe('$50.25');
    });

    it('should throw error when subtracting Money objects with different currencies', () => {
      // Given
      const moneyUSD = new Money('100.50', currencyInfoUSD);
      const moneyEUR = new Money('50.25', currencyInfoEUR);

      // When, Then
      expect(() => moneyUSD.subtract(moneyEUR)).toThrow(
        'Currencies must be the same',
      );
    });
  });

  describe('multiply', () => {
    it('should multiply the amount by a factor', () => {
      // Given
      const money = new Money('100.50', currencyInfoUSD);

      // When
      const result = money.multiply(2);

      // Then
      expect(result.toFormat()).toBe('$201.00');
    });
  });

  describe('divide', () => {
    it('should divide the amount by a divisor', () => {
      // Given
      const money = new Money('100.50', currencyInfoUSD);

      // When
      const result = money.divide(2);

      // Then
      expect(result.toFormat()).toBe('$50.25');
    });
  });

  describe('percentage', () => {
    it('should calculate the percentage of the amount', () => {
      // Given
      const money = new Money('100.50', currencyInfoUSD);

      // When
      const result = money.percentage(10);

      // Then
      expect(result.toFormat()).toBe('$10.05');
    });
  });

  describe('allocate', () => {
    it('should allocate the amount based on given ratios', () => {
      // Given
      const money = new Money('100.00', currencyInfoUSD);
      const ratios = [50, 25, 25];

      // When
      const allocatedAmounts = money.allocate(ratios);

      // Then
      expect(allocatedAmounts.map((m) => m.toFormat())).toEqual([
        '$50.00',
        '$25.00',
        '$25.00',
      ]);
    });
  });

  describe('equalsTo', () => {
    it('should return true when comparing two Money objects with the same amount and currency', () => {
      // Given
      const money1 = new Money('100.50', currencyInfoUSD);
      const money2 = new Money('100.50', currencyInfoUSD);

      // When
      const result = money1.equalsTo(money2);

      // Then
      expect(result).toBe(true);
    });

    it('should return false when comparing two Money objects with different amounts', () => {
      // Given
      const money1 = new Money('100.50', currencyInfoUSD);
      const money2 = new Money('50.25', currencyInfoUSD);

      // When
      const result = money1.equalsTo(money2);

      // Then
      expect(result).toBe(false);
    });

    it('should return false when comparing two Money objects with different currencies', () => {
      // Given
      const moneyUSD = new Money('100.50', currencyInfoUSD);
      const moneyEUR = new Money('100.50', currencyInfoEUR);

      // When
      const result = moneyUSD.equalsTo(moneyEUR);

      // Then
      expect(result).toBe(false);
    });
  });

  describe('lessThan', () => {
    it('should return true when comparing if one Money object is less than another with the same currency', () => {
      // Given
      const money1 = new Money('50.25', currencyInfoUSD);
      const money2 = new Money('100.50', currencyInfoUSD);

      // When
      const result = money1.lessThan(money2);

      // Then
      expect(result).toBe(true);
    });

    it('should throw error when comparing Money objects with different currencies', () => {
      // Given
      const moneyUSD = new Money('100.50', currencyInfoUSD);
      const moneyEUR = new Money('50.25', currencyInfoEUR);

      // When, Then
      expect(() => moneyUSD.lessThan(moneyEUR)).toThrow(
        'Currencies must be the same',
      );
    });
  });

  describe('greaterThanOrEqual', () => {
    it('should return true when comparing if one Money object is greater than or equal to another with the same currency', () => {
      // Given
      const money1 = new Money('100.50', currencyInfoUSD);
      const money2 = new Money('50.25', currencyInfoUSD);

      // When
      const result = money1.greaterThanOrEqual(money2);

      // Then
      expect(result).toBe(true);
    });

    it('should throw error when comparing Money objects with different currencies', () => {
      // Given
      const moneyUSD = new Money('100.50', currencyInfoUSD);
      const moneyEUR = new Money('50.25', currencyInfoEUR);

      // When, Then
      expect(() => moneyUSD.greaterThanOrEqual(moneyEUR)).toThrow(
        'Currencies must be the same',
      );
    });
  });

  describe('isZero', () => {
    it('should return true if the amount is zero', () => {
      // Given
      const money = new Money('0', currencyInfoUSD);

      // When
      const result = money.isZero();

      // Then
      expect(result).toBe(true);
    });

    it('should return false if the amount is not zero', () => {
      // Given
      const money = new Money('100.50', currencyInfoUSD);

      // When
      const result = money.isZero();

      // Then
      expect(result).toBe(false);
    });
  });

  describe('toFormat', () => {
    it('should format Money object amount correctly', () => {
      // Given
      const money = new Money('100.50', currencyInfoUSD);

      // When
      const formattedAmount = money.toFormat();

      // Then
      expect(formattedAmount).toBe('$100.50');
    });
  });

  describe('toNumber', () => {
    it('should convert Money object to a number', () => {
      // Given
      const money = new Money('100.50', currencyInfoUSD);

      // When
      const numericValue = money.toNumber();

      // Then
      expect(numericValue).toBe(100.5);
    });
  });

  describe('equalsTo', () => {
    it('should return true for equal amounts with the same currency', () => {
      // Given
      const money1 = new Money('100.50', currencyInfoUSD);
      const money2 = new Money('100.50', currencyInfoUSD);

      // When
      const result = money1.equalsTo(money2);

      // Then
      expect(result).toBe(true);
    });

    it('should return false for different amounts with the same currency', () => {
      // Given
      const money1 = new Money('100.50', currencyInfoUSD);
      const money2 = new Money('50.25', currencyInfoUSD);

      // When
      const result = money1.equalsTo(money2);

      // Then
      expect(result).toBe(false);
    });

    it('should return false for equal amounts with different currencies', () => {
      // Given
      const moneyUSD = new Money('100.50', currencyInfoUSD);
      const moneyEUR = new Money('100.50', currencyInfoEUR);

      // When
      const result = moneyUSD.equalsTo(moneyEUR);

      // Then
      expect(result).toBe(false);
    });
  });

  describe('equals', () => {
    it('should be an alias of equalsTo method', () => {
      // Given
      const money1 = new Money('100.50', currencyInfoUSD);
      const money2 = new Money('100.50', currencyInfoUSD);

      // When
      const result = money1.equals(money2);

      // Then
      expect(result).toBe(true);
    });
  });

  describe('lessThan', () => {
    it('should return true when the amount is less than the other with the same currency', () => {
      // Given
      const money1 = new Money('50.25', currencyInfoUSD);
      const money2 = new Money('100.50', currencyInfoUSD);

      // When
      const result = money1.lessThan(money2);

      // Then
      expect(result).toBe(true);
    });

    it('should return false when the amount is equal to the other with the same currency', () => {
      // Given
      const money1 = new Money('100.50', currencyInfoUSD);
      const money2 = new Money('100.50', currencyInfoUSD);

      // When
      const result = money1.lessThan(money2);

      // Then
      expect(result).toBe(false);
    });

    it('should return false when the amount is greater than the other with the same currency', () => {
      // Given
      const money1 = new Money('100.50', currencyInfoUSD);
      const money2 = new Money('50.25', currencyInfoUSD);

      // When
      const result = money1.lessThan(money2);

      // Then
      expect(result).toBe(false);
    });

    it('should throw error for different currencies', () => {
      // Given
      const moneyUSD = new Money('100.50', currencyInfoUSD);
      const moneyEUR = new Money('50.25', currencyInfoEUR);

      // When, Then
      expect(() => moneyUSD.lessThan(moneyEUR)).toThrow(
        'Currencies must be the same',
      );
    });
  });

  describe('lessThanOrEqual', () => {
    it('should return true when the amount is less than the other with the same currency', () => {
      // Given
      const money1 = new Money('50.25', currencyInfoUSD);
      const money2 = new Money('100.50', currencyInfoUSD);

      // When
      const result = money1.lessThanOrEqual(money2);

      // Then
      expect(result).toBe(true);
    });

    it('should return true when the amount is equal to the other with the same currency', () => {
      // Given
      const money1 = new Money('100.50', currencyInfoUSD);
      const money2 = new Money('100.50', currencyInfoUSD);

      // When
      const result = money1.lessThanOrEqual(money2);

      // Then
      expect(result).toBe(true);
    });

    it('should return false when the amount is greater than the other with the same currency', () => {
      // Given
      const money1 = new Money('100.50', currencyInfoUSD);
      const money2 = new Money('50.25', currencyInfoUSD);

      // When
      const result = money1.lessThanOrEqual(money2);

      // Then
      expect(result).toBe(false);
    });

    it('should throw error for different currencies', () => {
      // Given
      const moneyUSD = new Money('100.50', currencyInfoUSD);
      const moneyEUR = new Money('50.25', currencyInfoEUR);

      // When, Then
      expect(() => moneyUSD.lessThanOrEqual(moneyEUR)).toThrow(
        'Currencies must be the same',
      );
    });
  });

  describe('greaterThan', () => {
    it('should return true when the amount is greater than the other with the same currency', () => {
      // Given
      const money1 = new Money('100.50', currencyInfoUSD);
      const money2 = new Money('50.25', currencyInfoUSD);

      // When
      const result = money1.greaterThan(money2);

      // Then
      expect(result).toBe(true);
    });

    it('should return false when the amount is equal to the other with the same currency', () => {
      // Given
      const money1 = new Money('100.50', currencyInfoUSD);
      const money2 = new Money('100.50', currencyInfoUSD);

      // When
      const result = money1.greaterThan(money2);

      // Then
      expect(result).toBe(false);
    });

    it('should return false when the amount is less than the other with the same currency', () => {
      // Given
      const money1 = new Money('50.25', currencyInfoUSD);
      const money2 = new Money('100.50', currencyInfoUSD);

      // When
      const result = money1.greaterThan(money2);

      // Then
      expect(result).toBe(false);
    });

    it('should throw error for different currencies', () => {
      // Given
      const moneyUSD = new Money('100.50', currencyInfoUSD);
      const moneyEUR = new Money('50.25', currencyInfoEUR);

      // When, Then
      expect(() => moneyUSD.greaterThan(moneyEUR)).toThrow(
        'Currencies must be the same',
      );
    });
  });

  describe('greaterThanOrEqual', () => {
    it('should return true when the amount is greater than the other with the same currency', () => {
      // Given
      const money1 = new Money('100.50', currencyInfoUSD);
      const money2 = new Money('50.25', currencyInfoUSD);

      // When
      const result = money1.greaterThanOrEqual(money2);

      // Then
      expect(result).toBe(true);
    });

    it('should return true when the amount is equal to the other with the same currency', () => {
      // Given
      const money1 = new Money('100.50', currencyInfoUSD);
      const money2 = new Money('100.50', currencyInfoUSD);

      // When
      const result = money1.greaterThanOrEqual(money2);

      // Then
      expect(result).toBe(true);
    });

    it('should return false when the amount is less than the other with the same currency', () => {
      // Given
      const money1 = new Money('50.25', currencyInfoUSD);
      const money2 = new Money('100.50', currencyInfoUSD);

      // When
      const result = money1.greaterThanOrEqual(money2);

      // Then
      expect(result).toBe(false);
    });

    it('should throw error for different currencies', () => {
      // Given
      const moneyUSD = new Money('100.50', currencyInfoUSD);
      const moneyEUR = new Money('50.25', currencyInfoEUR);

      // When, Then
      expect(() => moneyUSD.greaterThanOrEqual(moneyEUR)).toThrow(
        'Currencies must be the same',
      );
    });
  });

  describe('isPositive', () => {
    it('should return true for a positive amount', () => {
      // Given
      const money = new Money('100.50', currencyInfoUSD);

      // When
      const result = money.isPositive();

      // Then
      expect(result).toBe(true);
    });

    it('should return false for a zero amount', () => {
      // Given
      const money = new Money('0', currencyInfoUSD);

      // When
      const result = money.isPositive();

      // Then
      expect(result).toBe(false);
    });

    it('should return false for a negative amount', () => {
      // Given
      const money = new Money('-50.25', currencyInfoUSD);

      // When
      const result = money.isPositive();

      // Then
      expect(result).toBe(false);
    });
  });

  describe('isNegative', () => {
    it('should return true for a negative amount', () => {
      // Given
      const money = new Money('-50.25', currencyInfoUSD);

      // When
      const result = money.isNegative();

      // Then
      expect(result).toBe(true);
    });

    it('should return false for a zero amount', () => {
      // Given
      const money = new Money('0', currencyInfoUSD);

      // When
      const result = money.isNegative();

      // Then
      expect(result).toBe(false);
    });

    it('should return false for a positive amount', () => {
      // Given
      const money = new Money('100.50', currencyInfoUSD);

      // When
      const result = money.isNegative();

      // Then
      expect(result).toBe(false);
    });
  });
});
