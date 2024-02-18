// ? constants
import { STATUS, API_SETTING } from './../utils/constants';

class MainApi {
  constructor(setting) {
    this._address = setting.baseUrl;
    this._headers = setting.headers;
  }

  _checkResponse(res, url, message = '') {
    // check answer
    if (res.ok) {
      // print to console if development
      if (STATUS.DEV)
        console.log(
          `The request to server [${url}]${
            message && ` for [${message}]`
          } was successfully processed`,
        );

      return res.json();
    }

    // errors
    const error = res.json();
    return error.then((errorObj) =>
      Promise.reject({
        error: errorObj.error,
        status: res.status,
      }),
    );
  }

  // request to server
  async _request(url, options, message) {
    const res = await fetch(url, options);
    return this._checkResponse(res, url, message);
  }

  // ? POST

  /*** get auth token
   * @params user = {
   *    username: 'example password',
   *    password: 'example password',
   * }
   */
  signin(user) {
    return this._request(
      `${this._address}/auth/login`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(user),
      },
      'get auth token',
    );
  }

  /*** send message to chat by id
   * @params message: 'example password'
   */
  sendMessageToChatById(token, chatId, message) {
    const _headers = this._headers;
    _headers.authorization = token;
    return this._request(
      `${this._address}/chats/${chatId}`,
      {
        method: 'POST',
        headers: _headers,
        body: JSON.stringify({ message: message }),
      },
      'send message in chat by id',
    );
  }

  // ? PATCH

  /*** send message to chat by id
   * @params message: 'example password'
   */
  modifyMessageInChatById(token, chatId, messageId, message) {
    const _headers = this._headers;
    _headers.authorization = token;
    return this._request(
      `${this._address}/chats/${chatId}/${messageId}`,
      {
        method: 'PATCH',
        headers: _headers,
        body: JSON.stringify({ message: message }),
      },
      'modify message in chat by id',
    );
  }

  // ? GET

  /*** get user info
   * @params token: 'example token',
   */
  getUserInfo(token) {
    const _headers = this._headers;
    _headers.authorization = token;

    return this._request(
      `${this._address}/user/me`,
      {
        method: 'GET',
        headers: _headers,
      },
      'get user info',
    );
  }

  /*** get all users info
   * @params token: 'example token'
   */
  getAllUsersInfo(token) {
    const _headers = this._headers;
    _headers.authorization = token;

    return this._request(
      `${this._address}/users`,
      {
        method: 'GET',
        headers: _headers,
      },
      'get users info',
    );
  }

  /*** get users info by id
   * @params {
   *  userId = 255,
   *  token: 'example token'
   * }
   */
  getUserInfoById(token, userId) {
    const _headers = this._headers;
    _headers.authorization = token;
    return this._request(
      `${this._address}/users/${userId}`,
      {
        method: 'GET',
        headers: _headers,
      },
      'get user info by id',
    );
  }

  /*** get users chats info
   * @params {
   *  token: 'example token'
   * }
   */
  getUsersChatsInfo(token) {
    const _headers = this._headers;
    _headers.authorization = token;
    return this._request(
      `${this._address}/chats/`,
      {
        method: 'GET',
        headers: _headers,
      },
      'get users chats info',
    );
  }

  /*** get chat info by id
   * @params {
   *  token: 'example token',
   *  chatId: 255
   * }
   */
  getChatInfoById(token, chatId) {
    const _headers = this._headers;
    _headers.authorization = token;
    return this._request(
      `${this._address}/chats/${chatId}`,
      {
        method: 'GET',
        headers: _headers,
      },
      'get chat info by id',
    );
  }
}

// setting for main api
const setting = {
  baseUrl: API_SETTING.baseURL,
  headers: {
    origin: API_SETTING.baseURL,
    'Content-Type': API_SETTING.contentType,
  },
};

const mainApi = new MainApi(setting);
export default mainApi;
