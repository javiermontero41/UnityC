//Server

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/imagenes', express.static(path.join(__dirname, 'Imagenes')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'cheat_sheet.html'));
});

app.get('/css-cheat-sheet', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'css_cheat_sheet.html'));
});

app.listen(port, () => {
    console.log(`Corriendo en: http://localhost:${port}`);
});
