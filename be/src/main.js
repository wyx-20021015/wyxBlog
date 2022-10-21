const { app, APP_PORT } = require("./app");
// require("./app/database");
app.listen(APP_PORT, () => {
  console.log(`service working on ${APP_PORT}..`);
});
