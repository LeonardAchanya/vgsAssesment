require("dotenv").config();
const express = require('express');


const inboundRoute = require("./routes/inbound");
const outboundRoute = require("./routes/outbound");


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Home Page works!');
});

app.use("/api/inbound", inboundRoute);
app.use("/api/outbound", outboundRoute);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
  