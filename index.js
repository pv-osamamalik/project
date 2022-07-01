const {MongoClient} =  require('mongodb');
const express = require('express');
const app = express();
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port

async function main() {
    const uri = "mongodb+srv://Hamza:353C98e0!@nitrixwork.mmxzo.mongodb.net/?retryWrites=true&w=majority"
    const client = new MongoClient(uri);
    try {
    await client.connect();

    await  listDatabases(client);
    } catch (e)
    {
        console.error(e);
    } finally 
    {
        await client.close();
    }

}
main().catch(console.error);

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    })
}
app.listen(process.env.PORT || 8080);