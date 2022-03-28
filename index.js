const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Port
const PORT = process.env.PORT || 3030;
require("./app/routes/route.js")(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
