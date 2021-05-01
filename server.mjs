import express from "express";
import mongoose from "mongoose";
import Cors from "cors";

import userRouter from "./dbRoutes/userRoutes";
import postRouter from "./dbRoutes/postRoutes";
import columnRouter from "./dbRoutes/columnRoutes";
import dashboardRouter from "./dbRoutes/dashboardRoutes";

// App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_uri = "mongodb+srv://admin:7xWEzlHsVqbUDCPR@cluster0.ggrrt.mongodb.net/kanban_db?retryWrites=true&w=majority";


// Middleware
app.use(express.json()); // parses incoming requests based on json payloads.
app.use(Cors()); // adding headers to all the requests

//Routes:
app.use("/user", userRouter);
app.use("/column", columnRouter);
app.use("/dashboard", dashboardRouter);
app.use("/post", postRouter);


// DB Config
mongoose.connect(connection_uri, {
    useNewUrlParse: true,
    userCreateIndex: true,
    useUnifiedTopology: true
});


// Api Endpoints
app.get('/', (req, res) => (res.status(200).send("Hello")));


// Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
