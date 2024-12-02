import mongoose from 'mongoose';

/**
 * Connecting to MongoDB
 * @param {*} url : url
 */

const connectMongoDB = (url) => {
    mongoose.set('strictQuery', true);
    mongoose.connect(url)
    .then(() => console.log('\nConnected to MongoDB.\n'))
    .catch((err) => {
        console.error('\nFailed to connect with MondoDB!');
        console.error(err);
    });
};

export default connectMongoDB;