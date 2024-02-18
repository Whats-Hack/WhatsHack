// NotFound.js

class NotFound {
  constructor() {
    this.notFound = this.notFound.bind(this);
  }

  // notFound
  notFound(req, res) {
    res.status(404);
    res.send({ error: 'Router not found' });
  }
}

const notFoundController = new NotFound();

module.exports = notFoundController;
