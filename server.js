var fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5001;

const JSON_FILE = 'data.json';
const data = fs.readFileSync(JSON_FILE);
const elements = JSON.parse(data);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json())

app.get("/allTransactions", (req, res) => {
    res.send(elements);
});

app.post("/newTransaction", (req, res) => {
    elements.push(req.body)

    fs.writeFileSync(JSON_FILE, JSON.stringify(elements));
    res.status(200).send(elements);

});

app.listen(port, () => console.log(`Listening on port ${port}`));