const express = require('express');
const app = express();
const connectDB = require('./config/db');
const passport = require('passport');
require('./config/passport/setup')(passport);

app.use(express.json());

// initialize passport
app.use(passport.initialize());

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

// Define Routes
app.get('/api', function (req, res) {
  return res.send('api route');
});
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/protected', require('./routes/api/protected'));

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
