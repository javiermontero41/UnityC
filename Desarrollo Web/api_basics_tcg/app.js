//Actividad en clase: API Basico para cartas
//Javier Montero A01026213

import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

let cards = [
{
    "id": 1,
    "name": "Lethal Lion Max Verstappen",
    "type": "Event card",
    "effect": "Gather four Lethal Lion Max Verstappen and win",
},
{
    "id": 2,
    "name": "Nope Valtteri Bottas",
    "type": "Action card",
    "effect": "Cancel enemys player action card effects",
}
];

app.get('/api/cards', (req, res) => {
    if (cards.length === 0) {
        res.status(404).json({ message: 'No hay cartas disponibles' });
    } else {
        res.status(200).json(cards);
    }
});

app.get('/api/cards/:id', (req, res) => {
    const card = cards.find(c => c.id === parseInt(req.params.id));
    if (!card) {
        res.status(404).json({ message: 'La carta no existe' });
    } else {
        res.status(200).json(card);
    }
});

app.post('/api/cards', (req, res) => {
    const { id, name, effect, type} = req.body;
    if (!id || !name || !effect || !type) {
        res.status(400).json({ message: 'La carta debe tener un id, nombre, tipo y efecto' });
    } else if (cards.some(c => c.id === id)) {
        res.status(409).json({ message: 'Una carta con este ID ya existe.' });
    } else {
        cards.push({ id, name, effect, type });
        res.status(201).json({ message: 'Carta agregada', card: { id, name, effect, type } });
    }
});

app.delete('/api/cards/:id', (req, res) => {
    const cardIndex = cards.findIndex(c => c.id === parseInt(req.params.id));
    if (cardIndex === -1) {
        res.status(404).json({ message: 'La carta no existe' });
    } else {
        cards.splice(cardIndex, 1);
        res.status(200).json({ message: 'Carta eliminada' });
    }
});

app.put('/api/cards/:id', (req, res) => {
    const cardIndex = cards.findIndex(c => c.id === parseInt(req.params.id));
    if (cardIndex === -1) {
        res.status(404).json({ message: 'La carta no existe' });
    } else {
        const updatedCard = { ...cards[cardIndex], ...req.body };
        cards[cardIndex] = updatedCard;
        res.status(200).json({ message: 'Carta actualizada', card: updatedCard });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo`);
});