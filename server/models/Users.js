import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  NomComplet: { type: String, required: true, unique: true },
  Email: { type: String, required: true, unique: true },
  MotDePasse: { type: String, required: true },
  Role: { type: String, required: true },
});

export const Utilisateurs = mongoose.model("Utilisateurs", UserSchema, "Utilisateurs");