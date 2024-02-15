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
      "birthday": Date, // type is a date
      "city": "example city",
    }
  ```

  answer

  ```json
  {
    {
      "id": "id", // uniq // don't be a changeably
      "creationDate": Date, // type is a date
      "token": "some token", // id: iehbvpehwifbvpehf -> 12345
      "lastConnection":  Date, // type is a date
      "friends": [],

      "email": "example@text.com",
      "avatar": "url",
      "username": "example", // required
      "password": "example pass", // required
      "firstName": "example firstName",
      "lastName": "example lastName",
      "birthday": Date, // type is a date
      "city": "example city"
    }
  }
  ```
