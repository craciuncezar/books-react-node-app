module.exports = {
  secret: process.env.SECRET || "secret",
  db:
    process.env.NODE_ENV === "production"
      ? { database_url: process.env.DATABASE_URL, user: process.env.DB_USER, password: process.env.DB_PASS }
      : { database_url: "localhost", user: "root", password: "admin" }
};
