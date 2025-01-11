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
      const repos = await fetch(userData.repos_url);
      const reposData = await repos.json();

      res.status(200).send({ user: userData, repos: reposData });
    } else {
      const user = await fetch(`https://api.github.com/users/${userName}`);
      const userDetails = await user.json();

      if (userDetails.message !== undefined) {
        return res.status(404).send("User not found");
      }
      const data = await UserModel(userDetails);
      data.save();

      const repos = await fetch(data.repos_url);
      const reposData = await repos.json();

      res.status(200).send({ user: data, repos: reposData });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default userRoute;
