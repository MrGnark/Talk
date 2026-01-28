const crypto = require( "crypto" );

function Hash( str )
{
    return crypto.createHash( "sha256" ).update( str ).digest( "hex" );
}

module.exports = { Hash };