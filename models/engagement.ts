import mongoose from 'mongoose';
// Create a schema for Instagram webhook data
const engagementSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      
    },
    postId: {
      type: String,
    },
    engagementType: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now,
    },

});
  
// Create and export the model
export const engageUserModel = mongoose.models.engageUserModel || mongoose.model('engageUserModel', engagementSchema);