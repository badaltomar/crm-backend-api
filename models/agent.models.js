const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  agentName: {
    type: String,
    required: [true, "Agent Name is required"],
  },
  agentEmail: {
    type: String,
    required: [true, "Agent Email is required"],
    unique: true
  },
}, {timestamps: true});

const agent = mongoose.model("agent", agentSchema);
module.exports = agent;