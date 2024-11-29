import mongoose from "mongoose"

export const dataBase = () => {

    mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/easy-buy")
        .then(() => {
            console.log('MongoDB is connected');
        })
        .catch((error) => {
            console.log('Error while connecting to the database', error);
        });

}



// import catchAsyncError from "../middleware/catchAsyncError.js";
// import Stripe from "stripe";

// const stripe = new Stripe("sk_test_51NyXMoIuM3EPOKzALuRJZTV0dJQLDJT4MLlSffJlzPPmfIdCPV4acJZkaGIMxcdikwDgCjZQPCv5Xh9bS24JhvKb00tqyAiDP0");

// export const createCheckOut = catchAsyncError(async (req, res, next) => {
//     const { orders } = req.body;  
//     if (!Array.isArray(orders)) {
//         return res.status(400).json({ success: false, message: "Orders data should be an array" });
//     }

//     console.log("Orders received:", orders);

//     console.log("orders price", orders.price);
//     console.log("orders price", orders.quantity);
    

//     const lineItems = orders.map((item) => ({
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: Array.isArray(item.productName) ? item.productName[0] : item.productName, 
//           },
//           unit_amount: item.totalPriceOfProduct * 100, 
//         },
//         quantity: 1,
//       }));
      

//     console.log("lineItems",lineItems);
    

//     try {
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items: lineItems,
//             mode: "payment",
//             success_url: "http://localhost:5173/success",
//             cancel_url: "http://localhost:5173/cancel",
//         });

//         res.status(200).json({ id: session.id });
//     } catch (error) {
//         next(error); 
//     }
// });
