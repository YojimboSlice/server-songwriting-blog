const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const handler = async (event, context) => {
  let client;
  try {
    const uri = process.env.MONGO_URI;
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    const collection = client
      .db('songwriting_blog')
      .collection('song_writing_blog_posts');
    const cursor = collection.find();
    const data = await cursor.toArray();
    console.log(data, typeof data);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  } finally {
    if (client) {
      await client.close();
    }
  }
};

module.exports = { handler };
