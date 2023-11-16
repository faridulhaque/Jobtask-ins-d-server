const { getDb } = require("../utils/dbConnect");
const bcrypt = require("bcrypt");


const registerUser = async (req, res, next) => {
    try {
        const db = getDb();
        const collection = db.collection("users")
        const name = req.body.name
        const email = req.body.email;
        const passkey = req.body.password;


        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(passkey, salt)
        const existed = await collection.findOne({ email: email });

        if (!existed?._id) {
            const result = await collection.insertOne({ name, email, password });
            res.status(200).json(result)
        }

        else if (existed._id) {
            res.status(200).json({ msg: "Already Exists" })
        }

    } catch (error) {
        res.status(400).send(error);
    }
}


const loginUser = async (req, res) => {
    const db = getDb();
    const collection = db.collection("users")
    const email = req.body.email;
    const password = req.body.password;

    const existed = await collection.findOne({ email: email });
    if (!existed._id) {
        return res.status(404).json({ msg: 'User not found' })
    }
    else {
        const isMatched = await bcrypt.compare(password, existed?.password)

        if (!isMatched) {
            return res.status(404).json({ message: 'Password did not match' })
        }
        else {
            const user = {
                email: existed.email,
                name: existed?.name,
                _id: existed._id,
            }
            res.status(200).json(user)
        }
    }
}

module.exports = {registerUser, loginUser};