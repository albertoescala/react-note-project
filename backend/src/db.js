import Sequelize from "sequelize";

const Conn = new Sequelize("notesdb", "root", "", {
  dialect: "mysql",
  host: "localhost",
  port: "3306"
});

const Note = Conn.define("note", {
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

Conn.sync({force: true})

export default Conn;