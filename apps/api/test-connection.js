const { Client } = require('pg');

// Using your direct connection string
const client = new Client({
  host: 'db.owtroabtlgufvlbrhcul.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'f4BgoFkuD2PBKsCN',
  ssl: { rejectUnauthorized: false } // Required for Supabase
});

async function test() {
  try {
    console.log(' Attempting to connect to Supabase...');
    await client.connect();
    console.log('✅ SUCCESS! Connected to database.');
    
    // Try a simple query
    const result = await client.query('SELECT NOW()');
    console.log('✅ Database time:', result.rows[0].now);
    
    await client.end();
    console.log('✅ Connection closed.');
  } catch (err) {
    console.error(' CONNECTION FAILED!');
    console.error('Error:', err.message);
    console.error('Code:', err.code);
  }
}

test();