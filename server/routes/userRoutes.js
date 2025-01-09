import express from "express";
import UserModel from "../models/userModel.js";

const userRoute = express.Router();

userRoute.post("/", async (req, res) => {
  try {
    const userName = req.body.username;

    if (!userName) {
      return res.status(400).send("User name is required");
    }

    const userData = await UserModel.findOne({
      login: { $regex: `^${userName}$`, $options: "i" },
    });

    if (userData) {
      return res.status(200).send(userData);
    } else {
      const user = await fetch(`https://api.github.com/users/${userName}`);
      const userDetails = await user.json();
      const data = await UserModel(userDetails);
      data.save();
      res.status(200).send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default userRoute;
