import Tasks from "../models/tasks.model.js";
import Worker from "../models/worker.model.js";
import ErrorWrapper from "../utils/ErrorWrapper.util.js";
import ErrorHandler from "../utils/ErrorHandler.util.js";

export const postupdateProfile = ErrorWrapper( async (req, res, next)=>{
    const {name, email, phoneNumber, area, pincode, state} = req.body;
    try{
        const user = req.worker;
        user.name = name;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.location = {area, pincode, state};
        let cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        user.profileImage = cloudinaryResponse;
        await Worker.save();
        res.status(200).json({
            success: true,
            message: "Profile updated successfully"
        })
    
    }catch(Err) {
        throw new ErrorHandler(500, "Error while updating profile, " + Err);
    }
})

export const getTasks = ErrorWrapper( async (req, res, next)=>{
    try{
        let pincode = req.worker.pincode;
        let tasks = await Tasks.find({pincode: pincode});
        res.status(200).json({
            success: true,
            tasks: tasks
        })
    }catch(Err) {
        throw new ErrorHandler(500, "Error while fetching tasks, " + Err);
    }
})

//error
export const postUpdateTask = ErrorWrapper(async (req, res, next)=>{
    const {taskId, status} = req.body;
    try{
        let task = await Tasks.findByIdAndUpdate(taskId, {status: status}, {new: true});
        res.status(200).json({
            success: true,
            message: "Task status updated successfully"
        })
    }catch(Err) {
        throw new ErrorHandler(500, "Error while updating task status, " + Err);
    }   
})

