

require('dotenv').config();
const express = require('express');
const proxy = require('express-http-proxy');
const cors = require('cors');
const helmet = require('helmet');
const authMiddleware = require("./middleware/auth.middleware");

const app = express();
const PORT = process.env.PORT

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//proxy options
const options = {
    proxyReqPathResolver: (req) => {
        return req.originalUrl.replace(/^\/v1/, '/api');
    },
    proxyErrorHandler: (err, res, next) => {
        res.status(500).json({
            message : "Internal Server Error",
            error : err.message
        });
    }
}

app.use(
  "/v1/design",
  authMiddleware,
  proxy(process.env.DESIGN, {
    ...options,
  })
);

app.use("/v1/media", authMiddleware, proxy(process.env.UPLOAD, {
    ...options,
    parseReqBody : false
}));

app.use(
  "/v1/subscription",
  authMiddleware,
  proxy(process.env.SUBSCRIPTION, {
    ...options,
  })
);


async function startServer() {
    try {
        app.listen(PORT, () => {
            console.log(`API Gateway service is running on port ${PORT}`);
            console.log(`Design service is running on port ${process.env.DESIGN}`);
            console.log(`Upload service is running on port ${process.env.UPLOAD}`);
            console.log(`Subscription service is running on port ${process.env.SUBSCRIPTION}`);
        });
    } catch (error) {
        console.error('Error while connecting to the server:', error);
    }
}

startServer();