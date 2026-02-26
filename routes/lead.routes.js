const express = require("express");
const router = express.Router();

const Lead = require("../models/lead.models");

// GET /leads with filters & sorting
router.get("/", async (req, res) => {
  try {
    const { salesAgent, status, q, sort } = req.query;

    const filter = {};
    const sortOption = {};

    if (salesAgent) {
      filter.agent = salesAgent;
    }

    if (status) {
      filter.leadStatus = status;
    }

    
    if (q) {
      filter.$or = [
        { leadName: { $regex: q, $options: "i" } },
        { leadSource: { $regex: q, $options: "i" } },
      ];
    }

    if (sort === "priority-asc") sortOption.priority = 1;
    if (sort === "priority-desc") sortOption.priority = -1;
    if (sort === "time-asc") sortOption.timeToClose = 1;
    if (sort === "time-desc") sortOption.timeToClose = -1;

    const leads = await Lead.find(filter)
      .sort(sortOption)
      .populate("agent");

    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch leads",
      error: error.message,
    });
  }
});

// POST /leads
router.post("/", async (req, res) => {
  try {
    const leadName = req.body.leadName?.trim();
    const dealValue = req.body.dealValue;

    const existingLead = await Lead.findOne({ leadName, dealValue });

    if (existingLead) {
      return res.status(400).json({
        message: "Lead with same name and deal value already exists",
      });
    }

    const newLead = new Lead({
      ...req.body,
      leadName,
    });

    const savedLead = await newLead.save();

    res.status(201).json({
      message: "Lead added successfully.",
      newLead: savedLead,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add lead!",
      error: error.message,
    });
  }
});

// PATCH /leads/:leadId
router.patch("/:leadId", async (req, res) => {
  try {
    const { leadId } = req.params;

    const updatedLead = await Lead.findByIdAndUpdate(
      leadId,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate("agent");

    if (!updatedLead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.status(200).json({
      message: "Lead updated successfully",
      updatedLead: updatedLead,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update lead",
      error: error.message,
    });
  }
});

// DELETE /leads/:leadId
router.delete("/:leadId", async (req, res) => {
  try {
    const { leadId } = req.params;

    const deletedLead = await Lead.findByIdAndDelete(leadId);

    if (!deletedLead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.status(200).json({
      message: "Lead deleted successfully",
      deletedLead: deletedLead
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete lead",
      error: error.message,
    });
  }
});

module.exports = router;