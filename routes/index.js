const authRoutes = require("./auth");
const buyerRoutes = require("./buyer");
const sellerRoutes = require("./seller");

module.exports = (app) => {
    app.use("/api/auth", authRoutes);
    app.use("/api/buyer", buyerRoutes);
    app.use("/api/seller", sellerRoutes);

    app.all('/*', (req, res) => {
        res.status(404).send({ errno: 404, message: 'Endpoint not found', type: "INVALID_ENDPOINT" });
    });
}