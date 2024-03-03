let express = require('express');
let routerBids = express.Router();
let bids = require('../data/bids');
let items = require('../data/items');

routerBids.post('/', (req, res) => {
    let amount = req.body.amount

    let itemId = req.body.itemId

    if (amount == undefined || isNaN(amount)) {
        res.status(400).json({error: 'not valid amount'})
        return
    }

    if (itemId == undefined || items.find(i => i.id == itemId) == undefined) {
        res.status(400).json({error: 'not valid itemId'})
        return
    }

    let lastId = bids[bids.length - 1].id
    bids.push({
        id: lastId + 1,
        userId: req.infoApiKey.id,
        itemId: itemId,
        amount: parseFloat(amount)
    })

    res.send({added: lastId + 1})
});

routerBids.get('/', (req, res) => {
    res.json(bids)
});

routerBids.get('/:id', (req, res) => {
    let currentBid = bids.find( bid => bid.id == req.params.id)
    
    if (currentBid == undefined) {
        res.status(400).json({error: 'not bid with this id'})
        return
    }

    res.json(currentBid)
});

module.exports = routerBids;