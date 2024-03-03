let express = require('express');
let jwt = require('jsonwebtoken');
let app = express();
let port = 8081;

app.use(express.json());

app.use(['/items', '/bids'], (req, res, next) => {
    console.log('middleware')

    let apiKey = req.query.apiKey

    if (apiKey == undefined) {
        res.status(401).json({error: 'not apiKey'})
        return
    }

    let infoApiKey
    try{
        infoApiKey = jwt.verify(apiKey, 'secret')
    } catch (error) {
        res.status(401).json({error: 'not valid apiKey'})
        return
    }

    req.infoApiKey = infoApiKey

    next()
});

let routerItems = require('./routers/routerItems');
let routerBids = require('./routers/routerBids');
let routerUsers = require('./routers/routerUsers');
app.use('/items', routerItems);
app.use('/bids', routerBids);
app.use('/users', routerUsers);

app.listen(port, () => {
    console.log('Servidor activo en ' + port)
});