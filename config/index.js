module.exports = {
  secret: process.env.SECRET || "secret",
  db:
    process.env.NODE_ENV === "production"
      ? { name:process.env.DB_NAME ,database_url: process.env.CLEARDB_DATABASE_URL, user: process.env.DB_USER, password: process.env.DB_PASS }
      : { name:"bookclub", database_url: "localhost", user: "root", password: "admin" }
};
