const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const handler = async (event, context) => {
  try {
    const uri = process.env.MONGO_URI; // Replace with your MongoDB URI
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    const collection = client
      .db('songwriting_blog')
      .collection('song_writing_blog_posts'); // Replace with your collection name
    const cursor = collection.find();
    const data = await cursor.toArray();
    console.log(data, typeof data);
    await client.close();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error(error); // Log the error to the console
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};

module.exports = { handler };
