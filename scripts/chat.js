const path = require( "path" );
const database = require( "./database" );
const crypto = require( "./crypto" );

function SendHomePage( req, res )
{
    res.sendFile( path.join( __dirname, "../webviews/index.html" ) );
}

async function RegisterUser( io, socket, id )
{
    var out = {
            usr : id.usr,
            status : ""
        };

    var res = await database.GetUser( id );

    if( res.found === true )
    {
        out.status = "existing_usr";
    }
    else
    {
        const r = database.AddUser( id );
        out.status = ( r )? "done" : "fatal_error";
    }

    socket.emit( "register_state", out );
    io.emit( "connected", out.usr );
}

async function ConnectUser( io, socket, id )
{
    var out = {
        usr    : id.usr,
        status : ""
    };

    var res = await database.GetUser( id );

    if( res.found )
    {
        out.status = "done";
        if( crypto.Hash( id.code ) !== res.password )
        {
            out.status = "wrong_code";
        }
    }
    else
    {
        out.status = "unknown_usr";
    }

    socket.emit( "connect_state", out );
    io.emit( "connected", out.usr );
}

function SendMessage( socket, msg )
{
    socket.emit( "message", msg );
}

module.exports = { 
    SendHomePage,
    RegisterUser,
    ConnectUser,
    SendMessage
};