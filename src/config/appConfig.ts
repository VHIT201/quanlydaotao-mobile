// appConfig.ts
// Centralized app configuration

const APP_CONFIG = {
  phone: {
    regex: /^((\+84|0)[3|5|7|8|9])+([0-9]{8})$/,
    countryCode: '+84',
    prefix: '0',
    minLength: 9,
    maxLength: 11,
  },
  date: {
    format: 'DD/MM/YYYY',
    min: '2000-01-01',
    max: '2100-12-31',
    locale: 'vi-VN',
  },
  time: {
    format: 'HH:mm',
  },
  email: {
    regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  currency: {
    code: 'VND',
    numberFormat: { minimumFractionDigits: 0, maximumFractionDigits: 2 },
  },
  app: {
    name: 'Quản lý đào tạo',
    version: '1.0.0',
  },
  passwordRule: {
    minLength: 6,
    maxLength: 32,
    requireSpecial: true,
    requireNumber: true,
  },
  usernameRule: {
    minLength: 4,
    maxLength: 20,
    allowSpecial: false,
  },
};

export default APP_CONFIG;
