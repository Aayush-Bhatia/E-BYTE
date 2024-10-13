import User from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.util.js";
import ErrorWrapper from "../utils/ErrorWrapper.util.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.util.js";
import Tasks from "../models/tasks.model.js";


export const postScanWaste = ErrorWrapper(async (req, res, next) => {
    const {age, scrap, price, area, pincode, nearbyPlace, WasteAmount} = req.body;
    if (req.files.length == 0) {
        throw new ErrorHandler(400, "Please upload at least one image");
    }
    let cloudinaryResponse;
    try{
        cloudinaryResponse = await uploadOnCloudinary(req.files);
    }catch(err) {
        throw new ErrorHandler(500, `Error while uploading image ${err.message}`);
    }
    //calculation
    try{
        let pointsGenerated = [50,100];
        
        let user = req.user;
        

        let newRequest = {
            location: {
                area,
                pincode,
                nearbyPlace
            },
            pics:cloudinaryResponse,
            WasteAmount,
            status: 'Pending'
        }

        user.history.unshift(newRequest);
        user.currentRequestId = user.history[0]._id;
        await user.save();
        let task = await Tasks.create({
            userId: user._id,
            requestId: user.currentRequestId,
            status: "Pending",
            pincode
        });

        await task.save();

        res.status(201).json({
            success: true,
            pointsGenerated: pointsGenerated,
            requestId: user.currentRequestId,
            message: "Scanned successfully"
        })
    }catch(err) {
        throw new ErrorHandler(500, "Error while scanning waste");
    }
});


export const postupdateProfile = ErrorWrapper( async (req, res, next)=>{
    const {name, email, phoneNumber, area, pincode, state} = req.body;
    try{
        const user = req.user;
        user.name = name;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.location = {area, pincode, state};
        let cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        user.profileImage = cloudinaryResponse;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Profile updated successfully"
        })
    
    }catch(Err) {
        throw new ErrorHandler(500, "Error while updating profile, " + Err);
    }
})

export const updateFeedback = ErrorWrapper(async (req, res, next) => {
    try{
        const user = req.user;
        user.feedback = req.body.feedback;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Feedback submitted successfully"
        })
    }catch(err) {
        throw new ErrorHandler(500, "Error while submitting feedback, " + err);
    }
})

export const getUser = ErrorWrapper(async (req, res, next) => {
    try{
        const user = req.user;
        res.status(200).json({
            success: true,
            user
        })
    }catch(err) {
        throw new ErrorHandler(500, "Error while getting user, " + err);
    }
})

export const getCurrentStatus = ErrorWrapper(async (req, res, next) => {
    try{
        const user = req.user;
        let currentRequest = user.history.find(request => request._id.toString() === user.currentRequestId.toString());
        if(!currentRequest) {
            throw new ErrorHandler(404, "Request not found");
        }
        res.status(200).json({
            success: true,
            currentRequest
        })
    }catch(err) {
        throw new ErrorHandler(500, "Error while getting current status, " + err);
    }
}) 


