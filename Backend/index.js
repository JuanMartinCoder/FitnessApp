const express = require("express");
const helmet = require("helmet");
const bodyParser = require('body-parser');

const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.json({"message": "welcome to Todo App"});
})



require('./routes/todo.routes.js')(app);


const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> {
  console.log(`Server is listening on port ${PORT}`);
})