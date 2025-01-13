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

userRoute.get("/", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRoute.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await UserModel.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .send({ deletedUser: user, message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

export default userRoute;
