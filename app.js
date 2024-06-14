const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

app.use(cookieParser());

// router
const userRouter = require("./routes/users");
const orderRouter = require("./routes/orders");
const categoryRouter = require("./routes/category");
const likeRouter = require("./routes/likes");
const cartRouter = require("./routes/carts");
const bookRouter = require("./routes/books");
const tokenRouter = require("./routes/tokens");

// handelr
const { errorHandler } = require("./utils/errors");

app.use("/users", userRouter);
app.use("/orders", orderRouter);
app.use("/category", categoryRouter);
app.use("/likes", likeRouter);
app.use("/carts", cartRouter);
app.use("/books", bookRouter);
app.use("/tokens", tokenRouter);
app.use(errorHandler);
// listen
app.listen(process.env.PORT);