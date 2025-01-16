import mongoose from 'mongoose';
// Create a schema for Instagram webhook data
const resourceSchema = new mongoose.Schema({
    postId: {
      type: String,
      required: true,
    },
    resource: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    postUrl: {
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
export const resourcesDataModel = mongoose.models.resourcesDataModel || mongoose.model('resourcesDataModel', resourceSchema);