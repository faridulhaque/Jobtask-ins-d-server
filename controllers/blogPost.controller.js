const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

const blogPost = async (req, res, next) => {
    try {
        const db = getDb();
        const collection = db.collection("blogPosts")
        const body = req.body;
        const result = await collection.insertOne(body);

        res.status(200).json(result);


    } catch (error) {
        res.status(400).send(error);
    }
}


const getCommentatorProfile = async (req, res, next) => {
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


const getOneBlogPost = async (req, res, next) => {
    try {
        const db = getDb();
        const collection = db.collection("blogPosts")
        const id = req.params.id;

        const query = { _id: ObjectId(id) };

        const result = await collection.findOne(query);

        res.status(200).json(result);


    } catch (error) {
        res.status(400).send(error);
    }
}

const makeLikeUnlike = async (req, res, next) => {
    const db = getDb();
    const collection = db.collection("blogPosts");
    const id = req.params.id;
  
    const email = req.body.email;
  
    const query = { _id: ObjectId(id) };
  
    const existingDocument = await collection.findOne(query);
    const isEmailPresent = existingDocument?.likes?.includes(email);
  
    let update;
    if (isEmailPresent) {
      update = { $pull: { likes: email } };
    } else {
      update = { $push: { likes: email } };
    }
  
    const result = await collection.updateOne(query, update);
    res.status(200).json(result);
  };

const saveComment = async (req, res, next) => {
    const db = getDb();
    const collection = db.collection("blogPosts");
    const id = req.body.postId;
  
    const email = req.body.userEmail;
    const comment = req.body.comment;
  
    const query = { _id: ObjectId(id) };
    const doc = await collection.findOne(query)
    const update = {$push: { comments: {userEmail: email, comment: comment} } }

    const result = await collection.updateOne(query, update);
    res.status(200).json(result);
}

const getAllBlogs = async (req, res) => {
    try {
        const db = getDb();
        const collection = db.collection("blogPosts")
        const query = {};
        const cursor = collection.find(query);
        const posts = await cursor.toArray();
        res.status(200).json(posts);



    } catch (error) {
        res.status(400).send(error);
    }
}


module.exports = { blogPost, getAllBlogs, getOneBlogPost, makeLikeUnlike, saveComment, getCommentatorProfile };