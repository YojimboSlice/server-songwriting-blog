const { MongoClient } = require('mongodb');
require('dotenv').config();

exports.handler = async (event, context) => {
  try {
    const uri = process.env.MONGO_URI; // Replace with your MongoDB URI
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    const collection = client
      .db('songwriting_blog')
      .collection('songwriting_blog_posts'); // Replace with your collection name
    const cursor = collection.find();
    const data = await cursor.toArray();
    await client.close();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};
