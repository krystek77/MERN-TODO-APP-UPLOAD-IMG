const config = require("config");
const http = require("http");
const moongose = require("mongoose");
const app = require("./app");
//

const PORT = 4000;
const server = http.createServer(app);
server.listen(process.env.PORT || PORT, () =>
  console.log(`Server running on ${PORT} port`)
);
//Connect to mongo database
const db = config.get("mongoURI");
moongose
  .connect(process.env.MONGODB_URI || db, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then((result) => console.log("Connected to the database successfully"))
  .catch((error) => console.log("The connection to the database failed"));
