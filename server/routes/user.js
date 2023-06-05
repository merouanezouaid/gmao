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


router.post("/register", async (req, res) => {
    const { id, NomComplet, Email, MotDePasse, Role, Entreprise } = req.body;
    console.log(req.body);
    const user = await Utilisateurs.findOne({ Email });
    if (user) {
        return res.status(400).json({ message: "email already exists" });
    }
    const hashedPassword = await bcrypt.hash(MotDePasse, 10);
    const newUser = new Utilisateurs({
        id,
        NomComplet,
        Email,
        MotDePasse: hashedPassword,
        Role,
        Entreprise
    });
    await newUser.save();
    res.status(200).json({ message: "user created successfully" });
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