import express from "express";
import * as usersModel from "../models/usersModel";
import brcytjs from "bcryptjs";

export const usersRouter = express.Router();


usersRouter.post("/register",  async (req, res) => {
    try {
        const {username, password, department} = req.body;
        const user = await usersModel.findBy({username}).first();

        if(user) return res.status(409).json({message: "Username is already taken"});


        const newUser = await usersModel.add({
            username,
            password: await brcytjs.hash(password, 13),
            department
        });
        res.status(201).json(newUser);
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error registering new user"});
    }

});

/*
POST	/api/register	Creates a user using the information sent inside the body of the request. Hash the password before saving the user to the database.

POST	/api/login	Use the credentials sent inside the body to authenticate the user. On successful login, create a new JWT with the user id as the subject and send it back to the client. If login fails, respond with the correct status code and the message: 'You shall not pass!'

GET	/api/users	If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in respond with the correct status code and the message: 'You shall not pass!'.

 */