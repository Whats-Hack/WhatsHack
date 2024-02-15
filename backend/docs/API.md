# API

## info

```
  production domain - https://whatshack.adaptable.app/
  development domain - http://localhost:PORT/
  PORT - check in .env
```

## Routers

### sign

- domain/api/login _POST_

  request

  ```json
  {
    "username": "example",
    "password": "example pass"
  }
  ```

  answer

  ```json
  {
    "token": "some token" // id: iehbvpehwifbvpehf -> 12345
  }
  ```

- domain/api/register _POST_

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
      "birthday": Date, // type is a date
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
  [
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
      "birthday": "2000-01-01T00:00:00.000Z",
      "city": "example city",
      "isActive": true
    }
  ]
  ```

- domain/api/users/:id _GET_

  params

  ```json
    id: 0 // id of user
  ```

  answer

  ```json
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
    "birthday": "2000-01-01T00:00:00.000Z",
    "city": "example city",
    "isActive": true
  }
  ```

### chats

- domain/api/chats _GET_

  answer

  ```json
  [
    {
      "id": 0,
      "owners": [0, 1],
      "messages": [
        {
          "id": 0,
          "text": "example text",
          "creationDate": "date",
          "modifyDate": "date",
          "owner": 0
        },
        {
          "id": 1,
          "text": "example text",
          "creationDate": "date",
          "modifyDate": "date",
          "owner": 1
        }
      ]
    }
  ]
  ```

- domain/api/chats/:id _GET_

  params

  ```json
    id: 0 // id of chat
  ```

  answer

  ```json
  {
    "id": 0,
    "owners": [0, 1],
    "messages": [
      {
        "id": 0,
        "text": "example text",
        "creationDate": "date",
        "modifyDate": "date",
        "owner": 0
      },
      {
        "id": 1,
        "text": "example text",
        "creationDate": "date",
        "modifyDate": "date",
        "owner": 1
      }
    ]
  }
  ```
