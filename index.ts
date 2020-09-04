import express from "express";
import {usersRouter} from "./routes/usersRouter";


const port = process.env.PORT || 4000;

const server = express();

server.use(express.json());

server.use("/api", usersRouter);

server.listen(port, () =>{
    console.log(`server listening at http://localhost${port}`);
});