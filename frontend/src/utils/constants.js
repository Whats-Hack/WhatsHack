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

export const WEB_SOCKET_SETTING = {
  URL: STATUS.DEV
    ? 'ws://localhost:5005/websocket'
    : 'ws://whatshack.adaptable.app/websocket',
};

export const TIMER_REFRESH = {
  CHATS: {
    ONE: STATUS.DEV ? 1_000 : 2_500,
    ALL: 5_000,
  },
};
