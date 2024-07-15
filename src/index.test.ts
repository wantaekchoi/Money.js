import { CurrencyInfo } from './CurrencyInfo';
import { Money } from './Money';
import * as IndexModule from './index';

describe('Index Module', () => {
  it('should export CurrencyInfo class from index.ts', () => {
    expect(IndexModule.CurrencyInfo).toBeDefined();
    expect(new IndexModule.CurrencyInfo('USD', 'en')).toBeInstanceOf(
      CurrencyInfo,
    );
  });

  it('should export Money class from index.ts', () => {
    expect(IndexModule.Money).toBeDefined();
    const currencyInfo = new CurrencyInfo('USD', 'en');
    expect(new IndexModule.Money('100', currencyInfo)).toBeInstanceOf(Money);
  });
});
