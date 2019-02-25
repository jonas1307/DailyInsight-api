const app = require('express')();
const PORT = 3000;

require('./startup/db')();
require('./startup/routes')(app);

app.listen(PORT, () => {
    console.info(`Listening on port ${PORT}.`);
});
