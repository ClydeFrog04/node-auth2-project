import express from "express";
import * as usersModel from "../models/usersModel";
import brcypt from "bcryptjs";
import {restrict} from "../middleware/restrict";
import jwt from "jsonwebtoken";

export const usersRouter = express.Router();


usersRouter.post("/register",  async (req, res) => {
    try {
        const {username, password, department} = req.body;
        const user = await usersModel.findBy({username}).first();

        if(user) return res.status(409).json({message: "Username is already taken"});

        const newUser = await usersModel.add({
            username,
            password: await brcypt.hash(password, 13),
            department
        });
        res.status(201).json(newUser);
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error registering new user"});
    }
});

usersRouter.post("/login", async (req, res) => {
    try {
        const {username, password, department} = req.body;
        const user = await usersModel.findBy({username}).first();

        if(!user) return res.status(401).json({message: "Username invalid"});

        //hash the password and check that is matches what was found in db
        const passValid = await brcypt.compare(password, user.password);
        if(!passValid) return res.status(401).json({message: "Password invalid"});

        //generate a new json web token
        const token = jwt.sign({
            userID: user.id,
            department: user.department
            //@ts-ignore: todo: same jwt error as before string | und
        }, process.env.JWT_SECRET);

        res.cookie("token", token);
        res.status(200).json({token: token, userId: user.id});//again, sending the token in the response body because that's what the react students will expect in build week

    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error logging in"});
    }
});

usersRouter.get("/users", restrict, async (req, res) => {
    try {
        res.json(await usersModel.find());//no need to do any more logic here because restrict contains our authorization login
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error getting users"});
    }
});