const passport = require("passport");
const { ADMIN_USERS, JWT_TOKEN } = require("./constants");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      const finded = ADMIN_USERS.find(
        (user) => user.email === email && user.password === password
      );

      if (!finded) {
        return done(null, false, { message: "Incorrect email or password." });
      }
      return done(null, finded, { message: "Logged In Successfully" });
    }
  )
);

// Function that extracts the cookie from the request
// Need install cookie-parser to access req.cookies
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) token = req.cookies["jwt"];
  return token;
};

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: JWT_TOKEN,
    },
    async (jwt_payload, done) => {
      const { expiration } = jwt_payload;

      // Check if token has expired. If is expired, return "Unhautorized"
      if (Date.now() > expiration) {
        done("Your token has expired", false);
      }

      const finded = ADMIN_USERS.find((user) => user.id === jwt_payload.id);

      if (finded) return done(null, finded);
      else return done(null, false);
    }
  )
);
