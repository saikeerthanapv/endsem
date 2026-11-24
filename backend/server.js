
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json());

const file = './db.json';

// Get all food items
app.get('/foods', (req, res) => {
    const data = JSON.parse(fs.readFileSync(file));
    res.json(data.foods);
});

// Add new food item
app.post('/foods', (req, res) => {
    const data = JSON.parse(fs.readFileSync(file));

    const food = {
        id: Date.now(),
        name: req.body.name,
        category: req.body.category,
        price: Number(req.body.price)
    };

    data.foods.push(food);

    fs.writeFileSync(file, JSON.stringify(data, null, 2));

    res.json(food);
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
