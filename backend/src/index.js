import mongoose from "mongoose";
import app from "./app.js";
import logger from "./configs/logger.config.js";


//environment variables
const PORT = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017/letsChat";

//mongodb connection
mongoose.connect(DATABASE_URL).then(() => {
    logger.info("Connected to MongoDB.");
});

//exit on mongodb connection errors
mongoose.connection.on("error", (err) => {
    logger.error(`Error connecting to MongoDB: ${err}`);
    process.exit(1);
});

//mongodb debug mode
if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
}

let server;
server = app.listen(PORT, () => {
    logger.info('server is listening at port: ' + PORT);
});

//handle server errors
const exitHandler = () => {
    if (server) {
        logger.info("Server closed");
        process.exit(1);
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
}

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

//SIGTERM
process.on("SIGTERM", () => {
    if (server) {
        logger.info("Server closed");
        process.exit(1);
    } else {
        process.exit(1);
    }
});