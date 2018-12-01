const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
require("./config/passport-local");

const app = express();
app.use(bodyParser.json());
app.use(express.static("./frontend/build"));
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

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started on port ${port}...`));
