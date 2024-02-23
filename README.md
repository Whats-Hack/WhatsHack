# Project 2 - WhatsHack

### Description

- WhatsHack is a web application developed by Hugo and Dima as part of their Module 2 project. Serving as a learning platform for web development with React and API integration, WhatsHack mirrors the functionalities of WhatsApp in a modest manner. Through WhatsHack, users can chat with his friend and manage his friends list The project aims to provide a hands-on experience in developing a real-world application while honing their skills in web development.

---

### Instructions to run this app in your computer

- git clone this [link](https://github.com/Whats-Hack/WhatsHack.git)
- how to install dependencies
  - go to backend `cd backend` and write a command `npm install`
  - go to frontend `cd frontend` and write a command `npm install`
- before start you need create a `.env` file in backend with this one settings:

```json
PORT=5005
DEV=true
PROD=false
```

- after go to frontend and in `src/utils/constants.js` change STATUS like this

```js
export const STATUS = {
  SIMPLE: 'dev',
  DEV: true,
  PROD: false,
};
```

- to run application:
  - backend `cd backend; npm run dev`
  - frontend `cd frontend; npm run dev`

---

### How chatting ?

- first step is create a new one acc
  - you should write a uniq username and also password (don't forgot it)
- go to users page, and choose a someone you wanna to write
- type something to him/her
- wait a bit and check answer from opponent
- you also can change info about yourself in settings

---

### features

- authorization token store in localStore until you delete it (it's mean you don't need to login each time)
- loadings messages in real time\*
- change info about yourself in real time\*

---

### Demo

- to use application free you can visit [WhatsHack](https://whatshack.netlify.app)

#### All \*

- `in real time` - means you don't need to refresh the page to see this
