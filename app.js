let express = require('express');
let app = express();
let port = 8081;

let routerItems = require('./routers/routerItems');
app.use('/items', routerItems);

app.listen(port, () => {
    console.log('Servidor activo en ' + port)
});