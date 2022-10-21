const fs = require("fs");
const useRoutes = function (app) {
  fs.readdirSync(__dirname).forEach((file) => {
    const router = require(`./${file}`);
    if (JSON.stringify(router) == "{}" || router.routes == undefined) return;
    app.use(router.routes());
    app.use(router.allowedMethods());
  });
};

module.exports = useRoutes;
