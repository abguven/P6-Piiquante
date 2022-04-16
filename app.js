const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: ".env.development" });


const userRoutes = require('./routes/user');



const app = express();

app.use(cors());

// Parse body
app.use(express.json());

// Connect to mongoDb
const dbURI = `mongodb+srv://abguven_mongo:${process.env.DB_PASSWORD}@cluster0.ohkvt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Connecté à la base de données : ${process.env.DB_NAME}`);
        app.listen(process.env.PORT, () => {
            console.log("Serveur est actif sur le port : ", process.env.PORT);
        })
    })
    .catch((err) => { console.log(err.message) });


// user routes
app.use("/api/auth", userRoutes);

