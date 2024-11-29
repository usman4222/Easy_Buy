import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter the Product Name..."]
    },
    description: {
        type: String,
        required: [true, "Please Enter the Product Description..."]
    },
    price: {
        type: Number,
        required: [true, "Please Enter the Product Price..."],
        max: [99999999, "Price cannot exceed more than 8 characters"]
    },
    discount: {
        type: Number,
        max: [99999999, "Discount cannot exceed more than 8 characters"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        default: "product-img"
    },
    category: {
        type: String,
        required: [true, "Please Enter the Product Category"]
    },
    stock: {
        type: Number,
        required: [true, "Please Enter the Stock of Product"],
        max: [999999, "Stock cannot exceed more than 6 characters"],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model("Product", productSchema);


export default Product
