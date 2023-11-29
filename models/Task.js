const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    uid:{
      type:String
    },
    title: {
      unique:true,
      type: String
    },
    description: {
      type: String
    },
    assigned_to: {
      type: String
    },
    assignedDate:{
        type:String
    },
    duration:{
      type:String
    },
    comments:{
      type:String
    },
    status: {
      type: String
    },
    notifications:{
      type:Number
    }
  }
);

taskSchema.set('timestamps',true);

module.exports = mongoose.model("Tasks", taskSchema);
