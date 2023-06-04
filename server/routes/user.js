import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { Utilisateurs } from "../models/Users.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, MotDePasse } = req.body;

  const user = await Utilisateurs.findOne({ Email: email });

  if (!user) {
    return res
      .status(400)
      .json({ message: "email or password is incorrect" });
  }
    return res
    .status(200)
    .json({ message: "It's working" });
  
});

router.get("/users", async (req, res) => {
    const users = await Utilisateurs.find();
    res.send(users);
});


export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        jwt.verify(authHeader, "secret", (err) => {
            if (err) {
                return res.sendStatus(403);
            }
            next();
    });
} else {
    res.sendStatus(401);
}
};

export { router as userRouter };