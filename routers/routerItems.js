let express = require('express');
let routerItems = express.Router();
let items = require('../data/items');

routerItems.get('/', (req, res) => {
    res.json(items)
});

routerItems.get('/:id', (req, res) => {
    let currentItem = items.find( i => i.id == req.params.id)
    
    if (currentItem == undefined) {
        res.status(400).json({error: 'no item with this id'})
        return
    }

    res.json(currentItem)
});

module.exports = routerItems;