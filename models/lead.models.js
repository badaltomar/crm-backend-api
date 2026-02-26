const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: [true, "Author(agent) is required"],
    },
    text: {
      type: String,
      required: [true, 'Comment text is required'],
    },
    isSystem: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: "timestamp", updatedAt: false }
  }
);

const leadSchema = new mongoose.Schema({
    leadName: {
        type: String,
        required: [true, "Lead name is required"]
    },
    leadSource: {
        type: String,
        required: [true, "Lead source is required."],
        enum: ["Website", "Referral", "Cold Call", "Cold Email"]
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "agent",
        required: [true, "Sales agent is required"]
    },
    leadStatus: {
        type: String,
        required: true,
        enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed'],
        default: "New"
    },
    tags: {
        type: [{
            type: String,
            enum: ["High Value", "VIP", "Urgent", "Follow-up"],
        }],
    default: []
    },
    timeToClose: {
        type: Number,
        required: [true, 'Time to Close is required'],
        min: [1, 'Time to Close must be a positive number'],
    },
    priority: {
        type: String,
        required: true,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium',
    },

    dealValue: {
        type: Number,
        required: [true, "Deal Value is required"],
        min: [1, 'Deal Value must be a positive number'],
    },
    industry: {
        type: String,
        required: [true, "Industry is required"],
        enum: ["Technology", "Logistics", "Retail", "Finance", "Healthcare", "Manufacturing"]
    },
    closedAt: {
        type: Date
    },
    isClosed: {
        type: Boolean,
        default: false
    },
    comments: [commentSchema]


}, {timestamps: true})

const lead = mongoose.model("lead", leadSchema)

module.exports = lead