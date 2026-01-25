const chat    = require( "./scripts/chat" );

const express = require( "express" );
const app     = express();
const server  = require( "http" ).createServer( app );
const io      = require( "socket.io" )( server );
const port    = process.env.PORT || 80;

app.use( "/images",  express.static( "images" ) );
app.use( "/style",   express.static( "style" ) );
app.use( "/scripts", express.static( "scripts" ) );

app.get( "/", chat.SendHomePage );

io.on( "connection", ( socket ) => {
    console.log( "New connection." );

    socket.on( "user id", ( id ) => {
        io.emit( "id state", id );
    } );

    socket.on( "message", ( msg ) => {
        io.emit( "message", msg );
    } );
} );

server.listen( port, () => { console.log( `\tServer started successfully\n\tLooking on port ${port}` ) } );

//