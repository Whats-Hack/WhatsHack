// ! modules

export const STATUS = {
  SIMPLE: 'dev',
  DEV: true,
  PROD: false,
};

export const API_SETTING = {
  baseURL: STATUS.DEV
    ? 'http://localhost:5005/api'
    : 'https://whatshack.adaptable.app/api',
  contentType: 'application/json',
};

export const TIMER_REFRESH = {
  CHATS: {
    ONE: 1_000,
    ALL: 2_000,
  },
};
