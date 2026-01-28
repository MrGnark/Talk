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
    socket.on( "usr_register", async ( id ) => {
        await chat.RegisterUser( io, socket, id );
    } );

    socket.on( "usr_connect", async ( id ) => {
        await chat.ConnectUser( io, socket, id );
    } );

    socket.on( "usr_msg", ( msg ) => {
        chat.SendMessage( io, msg )
    } );
} );

server.listen( port, () => { console.log( `Server started successfully; listening on port ${port}.` ) } );

//