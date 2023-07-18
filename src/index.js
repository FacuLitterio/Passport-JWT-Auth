const express = require("express");
const morgan = require("morgan");
require("./passport");
const authRouter = require("./Routes/auth.router.js");
const passport = require("passport");
const userRouter = require("./Routes/user.router.js");
const cookieParser = require("cookie-parser");

const PORT = 4000;
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use("/auth", authRouter);
app.use(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  userRouter
);

app.get("/", (req, res) => res.json({ message: "Server running!" }));

app.listen(PORT, () => console.log(`Server on Port ${PORT}`));
