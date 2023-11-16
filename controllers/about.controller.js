const { getDb } = require("../utils/dbConnect");


const getUserProfile = async (req, res, next) => {
    try {
        const db = getDb()
        const collection = db.collection("users")
        const email = req.params.email;
        const query = { email: email };
        const result = await collection.findOne(query);
        res.status(200).json(result)

    } catch (error) {
        res.status(400).json(error)
    }
}

const updateUserProfile = async (req, res, next) => {
    try {
        const db = getDb();
        const collection = await db.collection("users");
        const email = req.params.email;
        const query = { email: email };
        const user = req.body;
        const options = { upsert: true };
        const data = {
            $set: {
                displayName: user.displayName,
                phone: user.phone,
                photo: user.photo,
                address: user.address,
                college: user.college,
                highSchool: user.highSchool,
                secondarySchool: user.secondarySchool,
                college: user.college,
                varsity: user.varsity,
                workplace: user.workplace
            },
        };
        const result = await collection.updateOne(query, data, options);
        res.status(200).json(result)

    } catch (error) {
        res.status(404).json(error)
    }
}

module.exports = { getUserProfile, updateUserProfile }