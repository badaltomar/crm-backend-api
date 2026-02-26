const express = require("express");
const router = express.Router();

const Agent = require("../models/agent.models");

// GET all agents
router.get("/", async (req, res) => {
  try {
    const agents = await Agent.find();
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch agents",
      error: error.message,
    });
  }
});

// POST create new agent
router.post("/", async (req, res) => {
  try {
    const { agentName, agentEmail } = req.body;

    // duplicate check by email
    const existingAgent = await Agent.findOne({ agentEmail });
    if (existingAgent) {
      return res.status(400).json({
        message: "Agent with this email already exists",
      });
    }

    const newAgent = new Agent({ agentName, agentEmail });
    const savedAgent = await newAgent.save();

    res.status(201).json({
      message: "Agent created successfully",
      agent: savedAgent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create agent",
      error: error.message,
    });
  }
});

// DELETE agent by ID
router.delete("/:agentId", async (req, res) => {
  try {
    const { agentId } = req.params;

    const deletedAgent = await Agent.findByIdAndDelete(agentId);

    if (!deletedAgent) {
      return res.status(404).json({
        message: "Agent not found",
      });
    }

    res.status(200).json({
      message: "Agent deleted successfully",
      deletedAgent: deletedAgent
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete agent",
      error: error.message,
    });
  }
});

module.exports = router;
