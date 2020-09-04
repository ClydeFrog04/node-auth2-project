import express from "express";


const port = process.env.PORT || 4000;

const server = express();

server.use(express.json());

server.listen(port, () =>{
    console.log(`server listening at http://localhost${port}`);
});