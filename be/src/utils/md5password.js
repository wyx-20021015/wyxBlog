const crypto = require("crypto");
function md5password(password) {
  const md5 = crypto.createHash("md5");
  const res = md5.update(password).digest("hex");
  return res;
}

module.exports = {
  md5password,
};
