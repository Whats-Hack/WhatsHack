# Backend

## Routers

- login _POST_

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

- register _POST_

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
