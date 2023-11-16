const { MongoClient } = require("mongodb");
require("dotenv").config();



const client = new MongoClient("mongodb+srv://faridulhaquemurshed:c0OKt0Istgxc3mfC@cluster0.yj5zscc.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});



let dbConnection;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            if (err || !db) {
                return callback(err);
            }

            dbConnection = db.db("database_blogcamp")
            console.log("Successfully connected to MongoDB.");

            return callback();
        });
    },

    getDb: function () {
        return dbConnection;
    },

};