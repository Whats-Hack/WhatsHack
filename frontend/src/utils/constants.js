// ! modules

export const STATUS = {
  SIMPLE: 'prod',
  DEV: false,
  PROD: true,
};

export const API_SETTING = {
  baseURL: STATUS.DEV
    ? 'http://localhost:5005/api'
    : 'https://whats-hack.adaptable.app/api',
  contentType: 'application/json',
};

export const TIMER_REFRESH = {
  CHATS: {
    ONE: STATUS.DEV ? 1_000 : 2_500,
    ALL: 5_000,
  },
};
