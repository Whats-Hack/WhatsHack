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
    <!-- status code 200 -->
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
    <!-- status code 201 -->
    "data": {
      "id": "id", // uniq // don't be a changeably
      "creationDate": "2024-02-15T15:15:24.947Z", // type is a date
      "lastConnection": "2024-02-15T15:15:24.947Z", // type is a date
      "friends": [],
      "chats": [],
      "isActive": true,

      "email": "example@text.com",
      "avatar": "url",
      "username": "example",
      "firstName": "example firstName",
      "lastName": "example lastName",
      "birthday": "2024-02-15T15:15:24.947Z", // type is a date
      "city": "example city"
    },
    "message": "User is created",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzA4MDEwMTI0fQ.x7xF2v_hUwKd1GNslgktRjV_nwfqp_Il8IJnhiGeILU"
  }
  ```

---

### users

```
  before use this routers you take token (use login)
  put your token in 'headers' in 'authorization'
```

- domain/api/users _GET_

  answer

  ```json
  {
    <!-- status code 200 -->
    "data": [
      {
        "id": 0,
        "avatar": "url",
        "username": "Huguiz"
      }
    ]
  }
  ```

- domain/api/users/me _GET_

  answer

  ```json
  {
    <!-- status code 200 -->
    "data": {
      "id": 0,
      "creationDate": "2000-01-01T00:00:00.000Z",
      "lastConnection": "2000-01-01T00:00:00.000Z",
      "friends": [],
      "chats": [],
      "email": "example@text.com",
      "avatar": "url",
      "username": "chyVacheck",
      "firstName": "example firstName",
      "lastName": "example lastName",
      "birthday": "2000-01-01T00:00:00.000Z",
      "city": "example city",
      "isActive": true // or false
    }
  }
  ```

- domain/api/users/:userId _GET_

  params

  ```json
    userId: 0 // id of user
  ```

  answer

  ```json
  {
    <!-- status code 200 -->
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
      "city": "example city"
    }
  }
  ```

  ```json
  {
    <!-- status code 410 -->
    "error": "User deleted his account :("
  }
  ```

  ```json
  {
    <!-- status code 404 -->
    "error": "User not found"
  }
  ```

- domain/api/users/:userId _PUT_

  params

  ```json
    userId: 0 // id of user that u want to add to friend
  ```

  answer

  ```json
    <!-- status code 200 -->
  ```

  ```json
  {
    <!-- status code 410 -->
    "error": "User deleted his account :("
  }
  ```

  ```json
  {
    <!-- status code 404 -->
    "error": "User not found"
  }
  ```

  ```json
  {
    <!-- status code 403 -->
    "error": "User are already your friend"
  }
  ```

  ```json
  {
    <!-- status code 400 -->
    "error": "Can not add yourself to friend"
  }
  ```

- domain/api/users/me _PATCH_

  request

  ```json
  {
    "email": "example@text.com",
    "avatar": "url",
    "firstName": "example firstName",
    "lastName": "example lastName",
    "birthday": "2000-01-01T00:00:00.000Z",
    "city": "example city"
  }
  ```

  no answer body

---

### chats

- domain/api/chats _GET_

  answer

  ```json
  {
    <!-- status code 200 -->
    "data": [
      // only chats that user has with last message
      {
        "id": 0,
        "owners": [0, 1],
        "messages": [
          {
            "id": 8,
            "text": "Also message from website he-he",
            "creationDate": "2024-02-17T17:00:02.833Z",
            "modifyDate": null,
            "owner": 1
          }
        ]
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
    <!-- status code 200 -->
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

  ```json
  {
    <!-- status code 403 -->
    "error": "You don't have permission"
  }
  ```

- domain/api/chats/:chatId/:messageId _GET_

  params

  ```json
    chatId: 0 // id of chat
    messageId: 0 // id of the last message that u have
  ```

  answer

  ```json
  <!-- status code 200 -->
  {
    "data": [
      {
        "id": 2,
        "text": "He-he me also",
        "creationDate": "2024-02-19T16:53:53.189Z",
        "modifyDate": null,
        "owner": 1
      }
    ]
  }
  ```

  ```json
  <!-- status code 304 -->
  ```

  ```json
  <!-- status code 403 -->
  {
    "error": "You don't have permission"
  }
  ```

- domain/api/chats _POST_

  body

  ```json
  {
    "userId": 2, // ! required // id of user that you want to create a new chat
    "message": "Hello it's a new chat" // can't be empty
  }
  ```

  answer

  ```json
  {
    <!-- status code 201 -->
    "data": {
      "id": 1,
      "owners": [0, 2],
      "messages": [
        // if was in body of request
        {
          "id": 0,
          "text": "Hello it's a new chat",
          "creationDate": "2024-02-19T16:16:27.176Z",
          "modifyDate": null,
          "owner": 0
        }
      ]
    }
  }
  ```

  ```json
  {
    <!-- status code 403 -->
    "error": "User already has own notes"
  }
  ```

  ```json
  {
    <!-- status code 403 -->
    "error": "You already have chat"
  }
  ```

- domain/api/chats/:chatId _POST_

  params

  ```json
    chatId: 0  // ! required // id of chat
  ```

  body

  ```json
  {
    "message": "example text" // can't be empty
  }
  ```

  answer

  ```json
  <!-- status code 201 -->
  {
    "id": 2,
    "text": "example text",
    "creationDate": "2024-02-19T16:53:53.189Z",
    "modifyDate": null,
    "owner": 1
  }
  ```

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

---

### soon

- domain/api/chats/:chatId/:messageId _DELETE_

  params

  ```json
    chatId: 0 // id of chat
    messageId: 0 // id of message
  ```

  no body in this request

  no answer body
