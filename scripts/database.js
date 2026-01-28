const pg = require( "pg" );
const crypto = require( "./crypto" );

const pool = new pg.Pool( {
    connectionString : process.env.DATABASE_URL
} );

async function GetUser( id )
{
    id.usr = id.usr.toUpperCase();

    const result = await pool.query( `SELECT * FROM users WHERE pseudo='${id.usr}';` );

    var out = {
        pseudo   : id.usr,
        found    : ( result.rowCount !== 0 ),
        password : ""
    };

    if( out.found )
    {
        out.password = result.rows[0].code;
    }

    return out;
}

async function AddUser( id )
{
    id.usr = id.usr.toUpperCase();
    id.code = crypto.Hash( id.code );

    const result = await pool.query( `INSERT INTO users(id, pseudo, code) VALUES ((SELECT COUNT(id) FROM users), '${id.usr}', '${id.code}');` );

    return ( result.rowCount === 1 );
}

module.exports = {
    GetUser,
    AddUser
};