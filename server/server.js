const express = require('express');
let cors = require('cors');
const apiRouter = require(`./routes`);

let app = express();

app.use(cors());
app.use(express.json());

app.use(`/api/chirps`, apiRouter)

app.listen(3000, () => {
    console.log(`Listening on port 3000`)
});