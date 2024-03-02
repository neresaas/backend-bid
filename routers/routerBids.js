let express = require('express');
let routerBids = express.Router();
let bids = require('../data/bids');

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