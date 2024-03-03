let express = require('express');
let app = express();
let port = 8081;

app.use(express.json());

let routerItems = require('./routers/routerItems');
let routerBids = require('./routers/routerBids');
let routerUsers = require('./routers/routerUsers');
app.use('/items', routerItems);
app.use('/bids', routerBids);
app.use('/users', routerUsers);

app.listen(port, () => {
    console.log('Servidor activo en ' + port)
});