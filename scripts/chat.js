
const path = require( "path" );

function SendHomePage( req, res )
{
    res.sendFile( path.join( __dirname, "../webviews/index.html" ) );
}

module.exports = { SendHomePage };