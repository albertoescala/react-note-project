import Express from "express";
import GraphHTTP from "express-graphql";
import Schema from "./schema";
import cors from "cors";

//Config
const APP_PORT = 4000;

const app = Express();

app.use(cors());

app.use(
  "/graphql",
  GraphHTTP({
    schema: Schema,
    pretty: true,
    graphiql: true
  })
);

app.listen(APP_PORT, () => {
  console.log("App listening on port " + APP_PORT);
});
