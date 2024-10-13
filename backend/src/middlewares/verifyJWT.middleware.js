import jwt from "jsonwebtoken";
import User from "../models/user.js";
import ErrorWrapper from "../utils/ErrorWrapper.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Worker from "../models/worker.model.js";

export const verifyjwt = ErrorWrapper(async (req, res, next) => {
    const incomingRefreshToken = req.cookies.RefreshToken;
    const incomingAccessToken = req.cookies.AccessToken;
    // console.log(incomingRefreshToken, incomingAccessToken);
    if (!incomingRefreshToken || !incomingAccessToken) {
        throw new ErrorHandler(401, "Not authorized to access, kindly login first and try again!");
    }
    try {

        let userInfo = jwt.verify(incomingAccessToken, process.env.ACCESS_TOKEN_KEY);
        let user = await User.findOne({
            _id: userInfo.userId,
        })

        let userRefreshToken = user.refreshToken;
        if (incomingRefreshToken !== userRefreshToken) {
            throw new ErrorHandler(401, "Not authorized to access, kindly login first and try again!");
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ErrorHandler(500, "Internal server error while login!");
    }
})


export const verifyjwtWorker = ErrorWrapper(async (req, res, next) => {
    const incomingRefreshToken = req.cookies.RefreshToken;
    const incomingAccessToken = req.cookies.AccessToken;
    // console.log(incomingRefreshToken, incomingAccessToken);
    if (!incomingRefreshToken || !incomingAccessToken) {
        throw new ErrorHandler(401, "Not authorized to access, kindly login first and try again!");
    }
    try {

        let userInfo = jwt.verify(incomingAccessToken, process.env.ACCESS_TOKEN_KEY);
        let worker = await Worker.findOne({
            _id: userInfo.userId,
        })

        let userRefreshToken = worker.refreshToken;
        if (incomingRefreshToken !== userRefreshToken) {
            throw new ErrorHandler(401, "Not authorized to access, kindly login first and try again!");
        }
        req.worker = worker;
        next();
    } catch (error) {
        throw new ErrorHandler(500, "Internal server error while login!");
    }
})