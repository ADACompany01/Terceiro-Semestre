const { MongoClient } = require('mongodb');
const jsonData = require('./clientes.json');

const uri = "mongodb+srv://ada2024fatecmrs:SMhe9Vu2RPkDIrlO@adacompanybd.14kbs.mongodb.net/";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('test');
    const collection = database.collection('clientes');

    const result = await collection.insertMany(jsonData);
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
