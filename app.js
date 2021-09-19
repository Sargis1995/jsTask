import express from "express";
const cors = require( "cors" ),
    app = express();

import routes from "./api/routes";

app.use( cors() );
app.use( express.json( { "limit": 200000000, "extended": true } ) );
app.use( express.urlencoded( { "limit": 200000000, "extended": true } ) );

app.use( routes );


app.get( "/", ( req, res ) => {
    res.send( "Hi" );
} );

app.listen( 5000, () => {
    console.log( "Rest listens at 5000!" );
} );
module.exports = app;
