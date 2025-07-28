import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { usermodel } from "../models/userScheama.js";
import dotenv from "dotenv";
dotenv.config()


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
    },
    async (_, __, profile, done) => {
      try {
        let user = await usermodel.findOne({ googleId: profile.id });

        if (!user) {
          user = await usermodel.create({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            googlepictureurl: profile.photos?.[0]?.value || "",
            role: "user",
          });
        }

        done(null, user);
      } catch (e) {
        done(e, null);
      }
    }
  )
);
