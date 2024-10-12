import User from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.util.js";
import ErrorWrapper from "../utils/ErrorWrapper.util.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.util.js";


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

