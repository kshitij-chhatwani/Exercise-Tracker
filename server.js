import app from './app';
const passport = require('passport');


const port = process.env.PORT || 3000;

app.listen(port);

console.log("Listening on port :"+port);

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls serializeUser and deserializeUser
