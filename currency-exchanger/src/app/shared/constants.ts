export class Constants {
  public static readonly menuList = [
    {
      code: 'currencyConverter',
      name: 'currency converter',
      link: '/currency-converter'
    },
    {
      code: 'viewConversionHistory',
      name: 'view conversion history',
      link: '/view-conversion-history'
    }
  ];

  public static readonly durationFilter = [
    { name: '7 days', code: 7 },
    { name: '14 days', code: 14 },
    { name: '30 days', code: 30 }
  ];

  public static readonly viewList = [
    { name: 'table', code: 'table' },
    { name: 'chart', code: 'chart' }
  ];

  public static dateFormat = 'dd/MM/yyyy';

  public static dateTimeFormat = 'dd/MM/yyyy @ HH:mm';
}
