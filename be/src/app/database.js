// const mysql = require("mysql2");
// const {
//   MYSQL_HOST,
//   MYSQL_PORT,
//   MYSQL_DATABASE,
//   MYSQL_USER,
//   MYSQL_PASSWORD,
// } = require("./config");
// const connections = mysql.createPool({
//   host: MYSQL_HOST,
//   port: MYSQL_PORT,
//   database: MYSQL_DATABASE,
//   user: MYSQL_USER,
//   password: MYSQL_PASSWORD,
// });

// connections.getConnection((err, conn) => {
//   if (err) {
//     console.log(err);
//   } else {
//     conn.connect((err) => {
//       if (err) {
//         console.log("连接失败:", err);
//       } else {
//         console.log("数据库连接成功~");
//       }
//     });
//   }
// });

// module.exports = connections.promise();
const { connect, connection } = require("mongoose");

module.exports = function setupMongo() {
  // const DB_URL = "mongodb://127.0.0.1:27017/blog3";
  const DB_URL = "mongodb://localhost:27017/wyxBlog";
  connect(DB_URL);

  return new Promise((resolve, reject) => {
    connection.on("connected", () => {
      console.log("connected to mongodb");
      resolve();
    });
    connection.on("error", (error) => {
      console.log("mongodb数据库连接失败", error);
      reject();
    });
  });
};
