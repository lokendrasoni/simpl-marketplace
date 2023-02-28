require("dotenv").config();

module.exports = (mongoose) => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const mongoCon = mongoose.connection;
    mongoCon.on("open", () => {
        console.log("Connected to MongoDB");
    });
};