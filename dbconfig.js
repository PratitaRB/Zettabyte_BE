const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://zettabyteArticle:zettabyteArt@cluster0.fgm7d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected Database ERROR! ", err);
});