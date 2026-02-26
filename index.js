const { initializedDatabase } = require("./db/db.connect");
require("dotenv").config()

const express = require("express")

const leadRoutes = require("./routes/lead.routes")
const agentRoutes = require("./routes/agent.routes")

const app = express()
app.use(express.json())

const cors = require("cors");
app.use(cors())

const PORT = process.env.PORT || 5000

initializedDatabase()


app.get("/", (req, res) => {
    res.send("API is running...")
})

app.use("/leads", leadRoutes);
app.use("/agents", agentRoutes);

app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
    
})