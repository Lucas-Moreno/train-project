import mongoose from 'mongoose'
import process from 'process'
import { MongooseModuleOptions } from '@nestjs/mongoose'
import UserModel from './user.models'
import dotenv from 'dotenv'

dotenv.config();

const uri = process.env.MONGO_URI

if (!uri) {
  throw new Error('MONGO_URI environment variable is not defined')
}

const options: MongooseModuleOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.set('strictQuery', false)

mongoose.connect(
  uri,
  options,
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded")
    } else {
      console.log("Error in db connection :" + err)
    }
  }
)

export { UserModel }