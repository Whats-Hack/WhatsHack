// ? constants
import { STATUS, API_SETTING } from './../utils/constants';

class MainApi {
  constructor(setting) {
    this._address = setting.baseUrl;
    this._headers = setting.headers;
  }

  async _checkResponse(res, url, message = '', json = true) {
    // check answer
    if (res.ok) {
      // print to console if development
      if (STATUS.DEV)
        console.log(
          `The request to server [${url}]${
            message && ` for [${message}]`
          } was successfully processed`,
        );

      return json ? res.json() : await res;
    }

    //
    if (res.status === 304) {
      return {
        statusText: res.statusText,
        status: res.status,
      };
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
  async _request(url, options, message, json) {
    const res = await fetch(url, options);
    return this._checkResponse(res, url, message, json);
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

  /*** register a new one user
   * @params user = {
   *    username: 'example password',
   *    password: 'example password',
   *    avatar: 'url',
   *    email: 'example@text.com',
   *    firstName: 'example firstName',
   *    lastName: 'example lastName',
   *    birthday: '2024-02-15T15:15:24.947Z',
   *    city: 'example city'
   * }
   */
  signup(user) {
    return this._request(
      `${this._address}/auth/register`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(user),
      },
      'register a new one user',
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

  /*** create a new one chat with user by id
   * @params userId: 255,
   */
  createOneChatByUserId(token, userId) {
    const _headers = this._headers;
    _headers.authorization = token;
    return this._request(
      `${this._address}/chats`,
      {
        method: 'POST',
        headers: _headers,
        body: JSON.stringify({ userId: userId }),
      },
      `create a new one chat with user ${userId}`,
    );
  }

  // ? PUT
  addOneUserToFriendsById(token, userId) {
    const _headers = this._headers;
    _headers.authorization = token;
    return this._request(
      `${this._address}/users/${userId}`,
      {
        method: 'PUT',
        headers: _headers,
      },
      `add user [${userId}] to friend`,
    );
  }

  // ? PATCH

  /*** send message to chat by id
   * @params newInfo: {
   *    message: 'example message',
   *    isDeleted: true,
   *  }
   */
  modifyMessageInChatById(token, chatId, messageId, newInfo) {
    const _headers = this._headers;
    _headers.authorization = token;
    return this._request(
      `${this._address}/chats/${chatId}/${messageId}`,
      {
        method: 'PATCH',
        headers: _headers,
        body: JSON.stringify(newInfo),
      },
      'modify message in chat by id',
      false,
    );
  }

  /*** send message to chat by id
   * @params newInfo: {
   *    email: "example@text.com",
   *    avatar: "url",
   *    firstName: "example firstName",
   *    lastName: "example lastName",
   *    birthday: "2000-01-01T00:00:00.000Z", // type date
   *    city: "example city"
      }
   */
  modifyUserInfoById(token, newInfo) {
    const _headers = this._headers;
    _headers.authorization = token;
    return this._request(
      `${this._address}/users/me`,
      {
        method: 'PATCH',
        headers: _headers,
        body: JSON.stringify(newInfo),
      },
      'modify current user info',
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
      `${this._address}/users/me`,
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
  getOneUserInfoById(token, userId) {
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
  getAllChatsInfo(token) {
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
  getOneChatInfoById(token, chatId) {
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

  /*** get the lattes messages by chat id
   * @params {
   *  token: 'example token',
   *  chatId: 255,
   *  lastMessageId: 255,
   * }
   */
  getLastMessagesOfOneChatById(token, chatId, lastMessageId) {
    const _headers = this._headers;
    _headers.authorization = token;
    return this._request(
      `${this._address}/chats/${chatId}/${lastMessageId}`,
      {
        method: 'GET',
        headers: _headers,
      },
      'get lattes messages by chat id',
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
