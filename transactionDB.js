require('dotenv').config();
const connectDB = require("./db/connect");
const Transaction = require("./models/transaction");
const axios = require("axios");

const start = async () => {
    try {
        // Connect to the MongoDB database
        await connectDB(process.env.MONGODB_URL);
        await Transaction.deleteMany();
        // Fetch data from the third-party API
        const response = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
        const dataFromAPI = response.data;

        // Transform data to include the "month" field (i didn't take month but keep it as an option)
        const dataWithMonth = dataFromAPI.map(item => {
            // Add the "month" field based on the "dateOfSale" field
            const dateOfSale = new Date(item.dateOfSale);
            const month = dateOfSale.toLocaleString('en-US', { month: 'long' });

            return {
                ...item,
                month: month
            };
        });

        // Save the transformed data into the MongoDB database
        await Transaction.create(dataWithMonth);
        console.log("Data saved successfully");
    } catch (error) {
        console.error("Error:", error);
    }
};

start();
