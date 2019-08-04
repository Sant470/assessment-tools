const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./routes/auth');
const assignments = require('./routes/assignments');


const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// list routes
app.use('/api/auth', auth);
app.use('/api/assignments', assignments);



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
