//Server

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html_cheat_sheet.html'));
});

app.listen(port, () => {
    console.log(`Corriendo en: http://localhost:${port}`);
});
