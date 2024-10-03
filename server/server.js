import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";


import connectToMongo from "./database/db.js";
import { userRouter, postRouter } from "./routes/index.js";
import { isAuthenticated } from "./middleWares/authMiddleware.js"
dotenv.config();
connectToMongo();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: false,
    maxAge: 15 * 60 * 60 * 1000
}));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'public', 'register.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/post', isAuthenticated, (req, res) => res.sendFile(path.join(__dirname, 'public', 'post.html')));
app.get('/index', isAuthenticated, (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html'), { username: req.user.username }));
app.use('/', userRouter);
app.use('/', postRouter);


app.listen(port, () => console.log(`Server running on port ${port}`));