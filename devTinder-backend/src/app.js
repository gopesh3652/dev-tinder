const express = require("express");

const app = express();
const PORT = 3000;

app.use("/hello", (req, res) => { res.send("<h1>Hi</h1>"); });
app.use("/test", (req, res) => { res.send("test"); });

app.listen(PORT, () => { console.log(`server is successfully listening on port http://localhost:${3000}`); }); 