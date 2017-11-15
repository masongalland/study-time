const express = require('express');
const expressGraphQl = require('express-graphql');
const app = express();
const schema = require('./schema.js')

app.use("/graphql", expressGraphQl({
    schema: schema,
    graphiql:true
}));

app.listen(4000, () => {
    console.log('listening on port 4000...')
});