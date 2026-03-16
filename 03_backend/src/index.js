// require ('dotenv').config({path: './env'})
import 'dotenv/config'
import connectDB from './db/index.js'
import { app } from './app.js'

/*
import dotenv from "dotenv";

dotenv.config(
    {
        path: './.env'
    }
)
*/
const port = process.env.PORT || 3000

connectDB()
    .then(() => {
        // Error handling check before server listen
        app.on('error', (error) => {
            console.log('Express Server Error::', error);
        });

        app.listen(port, () => {
            console.log(`⚙️  Server is running at port: ${port}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed !!! ", err);
    });




/*
import mongoose from "mongoose";
import { DB_NAME } from "./constants";

import express from "express";
const app = express()
const port = process.env.PORT
    ; (async () => {
        try {
            await mongoose.connect(`${port.MONGODB_URI}/${DB_NAME}`)
            app.on('error', (error) => {
                console.log('Error::', error);
                throw error
            })

            app.listen(port, () => {
                console.log(`App is listening on port ${port}`);

            })

        } catch (error) {
            console.error(error);
            throw error
        }
    })()

*/
