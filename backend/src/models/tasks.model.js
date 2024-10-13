import mongoose,{ Schema } from 'mongoose';
import 'bcrypt';

const taskSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    requestId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    status: {
        type: String,
        required: true
    },
    pincode  :{
        type: String,
        required: true
    }
});

const Tasks = mongoose.model('Tasks', taskSchema);
export default Tasks;