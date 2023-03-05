import express, { Request } from "express"
import mongoose from 'mongoose'
import { MongooseModuleOptions } from '@nestjs/mongoose'
import { authMiddleware } from '../middleware/auth.middleware'
import { signup, signin, logout } from "../controllers/auth.controller"
import { getInfoUser } from '../controllers/user.controller'
import { Router, Response } from '../types/types'

const router: Router = express.Router()

// Welcome to my api
router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to my API.")
});

// Health
router.get("/health", () => {
  const uri = `mongodb+srv://${process.env.NAME_DB}:${process.env.PASSWORD_DB}@cluster0.bqizz.mongodb.net/test-db?retryWrites=true&w=majority`

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
})

// Authentification
router.post('/signup', signup)
router.post('/signin', signin)
router.post('/logout', logout)

// User
router.get('/user', (req: Request, res: Response) => {
  authMiddleware(req, res, () => {
    getInfoUser(req, res)
  });
});


export default router;