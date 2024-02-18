const Transaction = require("../models/transaction");
//to show the API is working direct data 
const TransactionAll = async (req, res) => {
    const queryObject = {};
    try {
        const myData = await Transaction.find(queryObject);
        myData.sort((a, b) => new Date(b.dateOfSale) - new Date(a.dateOfSale));//sorting data based on date
        res.status(200).json({ myData });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//allTransactionByMonth
const AllTransactionsByMonth = async (req, res) => {
    const { month, search, page, limit } = req.query;
    const pageNumber = parseInt(page) || 1;
    const itemsPerPage = parseInt(limit) || 10;

    // Check if month parameter is provided
    if (!month) {
        return res.status(400).json({ error: 'Month parameter is required' });
    }

    // Construct the query object based on provided parameters
    const queryObject = { month };

    // Add optional parameters to the query object if provided
    if (search) {
        const searchRegex = new RegExp(search, 'i');
        queryObject.$or = [
            { title: { $regex: searchRegex } },
            { description: { $regex: searchRegex } },
            { category: { $regex: searchRegex } }
        ];
    }

    try {
        // Query for total count of documents matching the query
        const totalCount = await Transaction.countDocuments(queryObject);

        // Query for documents with pagination
        const myData = await Transaction.find(queryObject)
            .skip((pageNumber - 1) * itemsPerPage)
            .limit(itemsPerPage);

        res.status(200).json({ myData, totalCount });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//endpoint for statistic by month
const StatisticsByMonth = async (req, res) => {
    let { month } = req.query;

    if (!month) {
        return res.status(400).json({ error: 'Month parameter is required' });
    }

    // Convert the month value to title case (e.g., "january" -> "January")
    month = month.toLowerCase().replace(/^\w/, c => c.toUpperCase());

    try {
        // Calculate total sale amount for the selected month (case-insensitive)
        const totalSaleAmount = await Transaction.aggregate([
            { $match: { month } },
            { $group: { _id: null, total: { $sum: "$price" } } }
        ]);

        // Calculate total number of sold items for the selected month (case-insensitive)
        const totalSoldItems = await Transaction.countDocuments({ month, sold: true });

        // Calculate total number of unsold items for the selected month (case-insensitive)
        const totalUnsoldItems = await Transaction.countDocuments({ month, sold: false });

        res.status(200).json({
            totalSaleAmount: totalSaleAmount.length > 0 ? totalSaleAmount[0].total : 0,
            totalSoldItems,
            totalUnsoldItems
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const BarChartData = async (req, res) => {
    let { month } = req.query;

    if (!month) {
        return res.status(400).json({ error: 'Month parameter is required' });
    }

    // Convert the month value to title case (e.g., "january" -> "January")
    month = month.toLowerCase().replace(/^\w/, c => c.toUpperCase());

    try {
        //price ranges
        const priceRanges = [
            { min: 0, max: 100 },
            { min: 101, max: 200 },
            { min: 201, max: 300 },
            { min: 301, max: 400 },
            { min: 401, max: 500 },
            { min: 501, max: 600 },
            { min: 601, max: 700 },
            { min: 701, max: 800 },
            { min: 801, max: 900 },
            { min: 901, max: Infinity },
            //we can add more
        ];

        // Initialize an object to store the count for each price range
        const priceRangeCounts = {};

        // Query for documents matching the selected month (case-insensitive)
        const transactions = await Transaction.find({ month });

        // Iterate over each transaction to count items in each price range
        transactions.forEach(transaction => {
            const { price } = transaction;
            // Find the corresponding price range for the transaction
            const range = priceRanges.find(range => price >= range.min && price <= range.max);
            // Increment the count for that price range
            if (range) {
                const key = `${range.min}-${range.max}`;
                priceRangeCounts[key] = (priceRangeCounts[key] || 0) + 1;
            }
        });

        // Prepare the response data
        const barChartData = Object.keys(priceRangeCounts).map(range => ({
            range,
            count: priceRangeCounts[range]
        }));

        res.status(200).json(barChartData);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { TransactionAll, AllTransactionsByMonth, StatisticsByMonth, BarChartData };
