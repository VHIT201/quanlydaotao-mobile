// apiConfig.ts

export const API_BASE_URL = 'https://api.yourdomain.com';
export const API_TIMEOUT = 10000;


export const NETWORK_CONFIG = {
  timeout: API_TIMEOUT,
  retry: 2,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};
