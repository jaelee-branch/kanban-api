import express from "express";
import mongoose from "mongoose";
import Cors from "cors";

import Column from './dbSchema/dbColumn.mjs';
import Dashboard from './dbSchema/dbDashboard.mjs';
import User from './dbSchema/dbUser.mjs';
import Post from './dbSchema/dbPost.mjs';
import dbDashboard from "./dbSchema/dbDashboard.mjs";

// App Config
const app = express()
const port = process.env.PORT || 8001;
const connection_uri = "mongodb+srv://admin:7xWEzlHsVqbUDCPR@cluster0.ggrrt.mongodb.net/kanban_db?retryWrites=true&w=majority";


// Middleware
app.use(express.json()); // parses incoming requests based on json payloads.
app.use(Cors()); // adding headers to all the requests

// DB Config
mongoose.connect(connection_uri, {
    useNewUrlParse: true,
    userCreateIndex: true,
    useUnifiedTopology: true
});


// Api Endpoints
app.get('/', (req, res) => (res.status(200).send("Hello")));


// user
app.get('/kanban/user', (req, res) => {
    User.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});

app.post('/kanban/user', (req, res) => {
    const dbUser = req.body

    User.create(dbUser, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
});

// dashboard
app.get('/kanban/dashboard', (req, res) => {
    Dashboard.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});

app.post('/kanban/dashboard', (req, res) => {
    const dbDashboard = req.body

    Dashboard.create(dbDashboard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
});

//column
app.get('/kanban/column', (req, res) => {
    Column.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});

app.post('/kanban/column', (req, res) => {
    const dbColumn = req.body

    Column.create(dbColumn, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
});


// posts
app.get('/kanban/post', (req, res) => {
    Post.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});

app.post('/kanban/post', (req, res) => {
    const dbPost = req.body

    Post.create(dbPost, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
});

// Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
