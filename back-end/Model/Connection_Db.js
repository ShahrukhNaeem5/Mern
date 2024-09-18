const mongoose = require("mongoose");

async function ConnectionString() {
    const DB_Url = process.env.Connection_Db;
    await mongoose.connect(DB_Url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Database Connected");
        })
        .catch((err) => {
            console.error("Database Connection Error:", err);
        });
}

module.exports = ConnectionString;
