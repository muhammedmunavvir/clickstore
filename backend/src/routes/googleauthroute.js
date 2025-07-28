import express from "express";
import passport from "passport";
import { googleCallback } from "../controller/googleauthcontroller.js";

const googleauthroute = express.Router();

// Start Google login
googleauthroute.get("/", passport.authenticate("google", {
  scope: ["profile", "email"],
  session: false,
}));

// Google callback route
googleauthroute.get(
  "/callback", 
  passport.authenticate("google", { session: false }),
  googleCallback
);

export default googleauthroute;
