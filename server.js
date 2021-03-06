const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
require("./config/passport-local");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(express.static("./client/build"));
app.use(cors());

// Routes
app.use("/users", require("./routes/authentication"));
app.use(
  "/bookLists",
  passport.authenticate("jwt", { session: false }),
  require("./routes/bookList")
);
app.use(
  "/books",
  passport.authenticate("jwt", { session: false }),
  require("./routes/books")
);

const { router, updateBestSellersDB } = require("./routes/bestseller");
updateBestSellersDB();
setInterval(updateBestSellersDB, 86400000);
app.use(
  "/bestSellers",
  passport.authenticate("jwt", { session: false }),
  router
);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started on port ${port}...`));
