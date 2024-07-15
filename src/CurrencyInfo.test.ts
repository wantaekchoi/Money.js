import { CurrencyInfo } from './CurrencyInfo';

describe('CurrencyInfo', () => {
  describe('constructor', () => {
    it('should create a CurrencyInfo object with valid currency code and locale code', () => {
      // Given
      const currencyCode = 'USD';
      const localeCode = 'en-US';

      // When
      const currencyInfo = new CurrencyInfo(currencyCode, localeCode);

      // Then
      expect(currencyInfo.getCurrencyCode()).toBe(currencyCode);
      expect(currencyInfo.getLocaleCode()).toBe(localeCode);
    });

    it('should throw error when creating a CurrencyInfo object with invalid currency code', () => {
      // Given
      const invalidCurrencyCode = 'ABC';
      const localeCode = 'en-US';

      // When, Then
      expect(() => new CurrencyInfo(invalidCurrencyCode, localeCode)).toThrow(
        `Invalid currency code: ${invalidCurrencyCode}`,
      );
    });

    it('should throw error when creating a CurrencyInfo object with invalid locale code', () => {
      // Given
      const currencyCode = 'USD';
      const invalidLocaleCode = 'xx-XX';

      // When, Then
      expect(() => new CurrencyInfo(currencyCode, invalidLocaleCode)).toThrow(
        `Invalid locale code: ${invalidLocaleCode}`,
      );
    });
  });

  describe('getCurrencyCode', () => {
    it('should return the currency code', () => {
      // Given
      const currencyCode = 'USD';
      const localeCode = 'en-US';
      const currencyInfo = new CurrencyInfo(currencyCode, localeCode);

      // When
      const result = currencyInfo.getCurrencyCode();

      // Then
      expect(result).toBe(currencyCode);
    });
  });

  describe('getLocaleCode', () => {
    it('should return the locale code', () => {
      // Given
      const currencyCode = 'USD';
      const localeCode = 'en-US';
      const currencyInfo = new CurrencyInfo(currencyCode, localeCode);

      // When
      const result = currencyInfo.getLocaleCode();

      // Then
      expect(result).toBe(localeCode);
    });
  });

  describe('format', () => {
    it('should format the amount correctly based on currency and locale', () => {
      // Given
      const currencyCode = 'USD';
      const localeCode = 'en-US';
      const currencyInfo = new CurrencyInfo(currencyCode, localeCode);
      const amount = 100.5;

      // When
      const formattedAmount = currencyInfo.format(amount);

      // Then
      expect(formattedAmount).toBe('$100.50');
    });
  });
});
