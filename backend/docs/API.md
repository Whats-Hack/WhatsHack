# API

## info

- read this

```
  production domain - https://whatshack.adaptable.app/
  development domain - http://localhost:PORT/
  PORT - check in .env
```

- a possible response from the server may contain the following information

```json
{
  // also can be an array
  "data": {
    // some useful info from server
  },
  "message": "Some message from server", // for example 'User is created'
  "error": "Some error message", // for example 'You must be authorized', 'Token is not valid', 'This username is already chosen'
  "token": "eyJh... ...dTN0" // only when send request to login or register
}
```

## Routers

### auth

- domain/api/auth/login _POST_

  request

  ```json
  {
    "username": "example", // required
    "password": "example pass" // required
  }
  ```

  answer

  ```json
  {
    "token": "some token" // id: iehbvpehwifbvpehf -> 12345
  }
  ```

- domain/api/auth/register _POST_

  request

  ```json
  {
    "username": "example", // required
    "password": "example pass", // required
    "avatar": "url",
    "email": "example@text.com",
    "firstName": "example firstName",
    "lastName": "example lastName",
    "birthday": "2024-02-15T15:15:24.947Z", // type is a date
    "city": "example city"
  }
  ```

  answer

  ```json
  {
    "data": {
      "id": "id", // uniq // don't be a changeably
      "creationDate": "2024-02-15T15:15:24.947Z", // type is a date
      "token": "some token", // id: iehbvpehwifbvpehf -> 12345
      "lastConnection": "2024-02-15T15:15:24.947Z", // type is a date
      "friends": [],
      "chats": [],
      "isActive": true,

      "email": "example@text.com",
      "avatar": "url",
      "username": "example", // required
      "password": "example pass", // required
      "firstName": "example firstName",
      "lastName": "example lastName",
      "birthday": "2024-02-15T15:15:24.947Z", // type is a date
      "city": "example city"
    },
    "message": "User is created",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzA4MDEwMTI0fQ.x7xF2v_hUwKd1GNslgktRjV_nwfqp_Il8IJnhiGeILU"
  }
  ```

### users

```
  before use this routers you take token (use login)
  put your token in 'headers' in 'authorization'
```

- domain/api/users _GET_

  answer

  ```json
  {
    "data": [
      {
        "id": 0,
        "creationDate": "2000-01-01T00:00:00.000Z",
        "lastConnection": "2000-01-01T00:00:00.000Z", // only if they are friends
        "friends": [],
        "chats": [0],
        "email": "example@text.com",
        "avatar": "url",
        "username": "chyVacheck",
        "password": "example pass",
        "firstName": "example firstName",
        "lastName": "example lastName",
        "birthday": "2000-01-01T00:00:00.000Z",
        "city": "example city",
        "isActive": true
      }
    ]
  }
  ```

- domain/api/users/:userId _GET_

  params

  ```json
    id: 0 // id of user
  ```

  answer

  ```json
  {
    "data": {
      "id": 0,
      "creationDate": "2000-01-01T00:00:00.000Z",
      "lastConnection": "2000-01-01T00:00:00.000Z", // only if they are friends
      "friends": [],
      "email": "example@text.com",
      "avatar": "url",
      "username": "chyVacheck",
      "firstName": "example firstName",
      "lastName": "example lastName",
      "birthday": "2000-01-01T00:00:00.000Z",
      "city": "example city",
      "isActive": true
    }
  }
  ```

### chats

- domain/api/chats _GET_

  answer

  ```json
  {
    "data": [
      // only chats that user has
      {
        "id": 0,
        "creationDate": "2000-01-01T00:00:00.000Z",
        "lastConnection": "2000-01-01T00:00:00.000Z",
        "friends": [],
        "chats": [0],
        "email": "example@text.com",
        "avatar": "url",
        "username": "chyVacheck",
        "password": "example pass",
        "firstName": "example firstName",
        "lastName": "example lastName",
        "birthday": "2002-12-19T00:00:00.000Z",
        "city": "example city",
        "isActive": true
      },
      {
        "id": 1,
        "creationDate": "2000-01-01T00:00:00.000Z",
        "lastConnection": "2000-01-01T00:00:00.000Z",
        "friends": [],
        "chats": [0],
        "email": "example@text.com",
        "avatar": "url",
        "username": "Huguiz",
        "password": "example pass",
        "firstName": "example firstName",
        "lastName": "example lastName",
        "birthday": null,
        "city": "example city",
        "isActive": true
      }
    ]
  }
  ```

- domain/api/chats/:chatId _GET_

  params

  ```json
    chatId: 0 // id of chat
  ```

  answer

  ```json
  {
    // only if user is one of owner
    "data": {
      "id": 0,
      "owners": [0, 1],
      "messages": [
        {
          "id": 0,
          "text": "example text",
          "creationDate": "2000-01-01T00:00:00.000Z", // type is a date
          "modifyDate": "2000-01-01T00:00:00.000Z", // type is a date
          "owner": 0
        },
        {
          "id": 1,
          "text": "example text",
          "creationDate": "2000-01-01T00:00:00.000Z", // type is a date
          "modifyDate": "2000-01-01T00:00:00.000Z", // type is a date
          "owner": 1
        }
      ]
    }
  }
  ```

- domain/api/chats/:chatId _POST_

  params

  ```json
    chatId: 0 // id of chat
  ```

  body

  ```json
  {
    "message": "example text" // can't be empty
  }
  ```

  no answer body

- domain/api/chats/:chatId/:messageId _PATCH_

  params

  ```json
    chatId: 0 // id of chat
    messageId: 0 // id of message
  ```

  body

  ```json
  {
    "message": "example text" // can't be empty
  }
  ```

  no answer body

#### soon

- domain/api/chats/:chatId/:messageId _DELETE_

  params

  ```json
    chatId: 0 // id of chat
    messageId: 0 // id of message
  ```

  no body in this request

  no answer body
