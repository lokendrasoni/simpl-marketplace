const mongoose = require("mongoose");
const User = require("../models/users");
const Catalog = require("../models/catalogs");
const Order = require("../models/orders");

exports.getSellers = async () => {
    let sellers = await User.aggregate([
        {
            $match: {
                type: "seller"
            }
        },
        {
            $project: {
                id: "$_id",
                username: 1,
                _id: 0
            }
        }
    ]);

    return sellers;
};

exports.getCatalog = async (seller_id) => {
    let catalog = await Catalog.aggregate([
        {
            $match: {
                user: mongoose.Types.ObjectId(seller_id)
            }
        },
        {
            $lookup: {
                as: "products",
                from: "products",
                localField: "_id",
                foreignField: "catalog"
            }
        },
        {
            $project: {
                id: "$_id",
                product: {
                    id: "$product._id",
                    name: "$product.name",
                    price: "$product.price"
                }
            }
        }
    ]);

    return catalog[0] || null;
};

exports.createOrder = async ({ seller_id, buyer_id, products }) => {
    let order = await Order.findOne({ seller: seller_id, buyer: buyer_id });

    if (order) {
        order.products = [...order.products, ...products];
        await order.save();
    }
    else {
        order = await new Order({ seller: seller_id, buyer: buyer_id, products: products }).save();
    }

    order.id = order._id;
    delete order["_id"]; delete order["__v"];

    return order;
};