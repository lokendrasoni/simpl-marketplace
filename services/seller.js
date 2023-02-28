const mongoose = require("mongoose");
const Catalog = require("../models/catalogs");
const Product = require("../models/products");
const Order = require("../models/orders");

exports.createOrder = async ({ seller_id, name, products }) => {
    let catalog = await Catalog.findOne({ user: seller_id });

    if (!catalog) {
        catalog = await new Catalog({ user: seller_id, name }).save();
    }

    products = products.map(product => {
        product.user = seller_id;
        product.catalog = catalog._id;

        return product;
    });

    await Product.insertMany(products);

    catalog = catalog.toObject();
    catalog.id = catalog._id;
    catalog.products = products;
    delete catalog["_id"]; delete catalog["__v"];

    return catalog;
};

exports.getOrders = async (id, page, limit) => {
    const page = page >= 1 ? page : 1;
    const limit = limit || 50;
    const skip = limit * (page - 1);

    const orders = await Order.aggregate([
        {
            seller: mongoose.Types.ObjectId(id)
        },
        {
            $facet: {
                all: [
                    {
                        $sort: { created_at: -1 }
                    },
                    {
                        $skip: skip
                    },
                    {
                        $limit: limit
                    },
                    {
                        $lookup: {
                            as: "products",
                            from: "products",
                            localField: "products",
                            foreignField: "_id"
                        }
                    },
                    {
                        $lookup: {
                            as: "buyer",
                            from: "users",
                            localField: "buyer",
                            foreignField: "_id"
                        }
                    },
                    {
                        $unwind: {
                            preserveNullAndEmptyArrays: false,
                            path: "$buyer"
                        }
                    },
                    {
                        $project: {
                            id: "$_id",
                            _id: 0,
                            buyer: {
                                username: 1,
                                id: "$buyer._id",
                                _id: 0
                            }
                        }
                    }
                ],
                total: [
                    {
                        $count: "total"
                    }
                ]
            }
        },
        {
            $set: {
                total: {
                    $ifNull: [
                        {
                            $arrayElemAt: ['$total.count', 0]
                        },
                        0
                    ]
                }
            }
        }
    ]);

    const pagination = generatePagination({ page, limit, skip, total: orders[0].total });

    return { data: orders[0].all, pagination };
};