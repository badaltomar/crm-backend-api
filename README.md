# 📊 CRM Backend API

A RESTful **CRM (Customer Relationship Management) backend API** built using **Node.js, Express, and MongoDB**.  
This project manages **sales agents**, **leads**, and the **lead lifecycle** from creation to closure.

The API is designed to reflect **real-world backend development practices**, including schema validation, filtering, sorting, and clean API design.

---

## 🚀 Features

- Agent management (Create, Read, Delete)
- Lead management with full CRUD operations
- Lead lifecycle tracking (`New → Contacted → Qualified → Proposal Sent → Closed`)
- Advanced lead filtering, searching, and sorting
- Embedded comments with system-generated logs
- MongoDB schema validations using Mongoose
- Duplicate lead prevention logic
- Relationship handling using `populate`
- Centralized error handling with meaningful responses

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- CORS
- Vercel (Deployment)

---

## 🌐 API Base URL

https://crm-backend-api-sigma.vercel.app/

---

## 📁 Project Structure

```text
├── db/
│   └── db.connect.js
├── models/
│   ├── agent.models.js
│   └── lead.models.js
├── routes/
│   ├── agent.routes.js
│   └── lead.routes.js
├── index.js
├── package.json
├── vercel.json
└── .env
```



---

## 📌 API Endpoints

### Agent Routes

| Method | Endpoint | Description |
|------|--------|------------|
| GET | `/agents` | Fetch all agents |
| POST | `/agents` | Create a new agent |
| DELETE | `/agents/:agentId` | Delete an agent |

---

### Lead Routes

| Method | Endpoint | Description |
|------|--------|------------|
| GET | `/leads` | Fetch leads with filters & sorting |
| POST | `/leads` | Create a new lead |
| PATCH | `/leads/:leadId` | Update lead details |
| DELETE | `/leads/:leadId` | Delete a lead |

---

## 🔍 Lead Query Parameters

```text
/leads?salesAgent=<agentId>
/leads?status=Qualified
/leads?q=website
/leads?sort=priority-desc
/leads?sort=time-asc
```

Supports:
- Filtering by agent
- Filtering by lead status
- Text search (`leadName`, `leadSource`)
- Sorting by priority and time to close

---

## 📦 Sample Request Body (Create Lead)

```json
{
  "leadName": "Nimbus CRM Integration",
  "leadSource": "Website",
  "agent": "65f1a2b3c4d5e6f7890aa111",
  "timeToClose": 30,
  "dealValue": 120000,
  "industry": "Technology",
  "priority": "High",
  "tags": ["High Value"],
  "comments": [
    {
      "author": "agent_rohit",
      "text": "Client requested product demo."
    }
  ]
}
```

---
## ▶️ Running the Project (Locally)

Clone the repo  
```bash
git clone https://github.com/badaltomar/crm-backend-api
cd eterris-backend
npm install
npm run dev
```
The server will start on: http://localhost:5000/

---

## 🤝 Contributing

- Fork the repository
- Create a new branch (feature/my-feature)
- Commit changes
- Create a pull request

---

## 🧑‍💻 Author

- [Badal Tomar](https://github.com/badaltomar)
