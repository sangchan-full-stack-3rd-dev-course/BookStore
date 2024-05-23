const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

// router
const userRouter = require("./routes/users");
const orderRouter = require("./routes/orders");
const categoryRouter = require("./routes/category");
const likeRouter = require("./routes/likes");
const cartRouter = require("./routes/carts");
const bookRouter = require("./routes/books");

app.use("/users", userRouter);
app.use("/orders", orderRouter);
app.use("/category", categoryRouter);
app.use("/likes", likeRouter);
app.use("/carts", cartRouter);
app.use("/books", bookRouter);

// listen
app.listen(process.env.PORT);