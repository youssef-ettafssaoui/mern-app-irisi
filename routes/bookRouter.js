const router = require("express").Router();
const bookController = require("../controllers/book-controller");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/products")
  .get(bookController.getBooks)
  .post(auth, authAdmin, bookController.createBook);

router
  .route("/products/:id")
  .delete(auth, authAdmin, bookController.deleteBook)
  .put(auth, authAdmin, bookController.updateBook);

module.exports = router;
