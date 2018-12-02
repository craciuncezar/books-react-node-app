const Sequelize = require("sequelize");
const { db } = require("../config");
const sequelize = new Sequelize("bookClub", db.user, db.password, {
  host: db.database_url,
  dialect: "mysql",
  operatorsAliases: false,
});

const User = sequelize.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [5, 35]
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
});

const BookList = sequelize.define("bookList", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: "No description given"
  }
});

const Book = sequelize.define("book", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false
  },
  publishDate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    validate: {
      isDate: true
    }
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imgUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  }
});

User.hasMany(BookList);
BookList.belongsToMany(Book, { through: "bookList_book" });
Book.belongsToMany(BookList, { through: "bookList_book" });

sequelize
  .sync({
    logging: false
  })
  .then(() => console.log("Database initialized"))
  .catch(err =>
    console.log("Something went wrong initializing the db...", err)
  );

module.exports = {
  User,
  BookList,
  Book
};
