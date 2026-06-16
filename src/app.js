import express from 'express';
import defaultRouter from './routers/store.routes.js';
import apiRouter from './routers/api.routes.js';
import session from 'express-session';
import methodOverride from 'method-override';

//configure Express.js app
const app = express();
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
}));

//view engine
app.set("view engine", "ejs");
app.set("views", "src/views");

//static directories
app.use(express.static('public'));

//middleware
app.set('json spaces', 2);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//method override for RESTful 
app.use(methodOverride('_method'));

//routers
app.use("/", defaultRouter);
app.use("/api", apiRouter);

export default app;