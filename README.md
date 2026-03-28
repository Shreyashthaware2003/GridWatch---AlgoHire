# ⚡ GridWatch — Real-Time Infrastructure Monitoring System

## 🚀 Overview

GridWatch is a real-time monitoring platform designed to ingest high-frequency sensor data, detect anomalies, generate alerts, and update a live dashboard for operators.

The system focuses on:

* Reliable ingestion of sensor data  
* Real-time anomaly detection  
* Alert lifecycle management  
* Push-based real-time updates (no polling)  

---

## 🐳 Run with Docker (Recommended)

This project is fully containerized and can be started with a single command.

### 1. Clone the repository

git clone <repo-url>
cd GridWatch

### 2. Configure environment variables

Create `.env` file inside:

backend/.env

Example:

DB_HOST=your-aiven-host  
DB_PORT=22218  
DB_USER=avnadmin  
DB_PASSWORD=your-password  
DB_NAME=defaultdb  
PORT=5000  

---

### 3. Run the application

docker-compose up --build

---

### 4. Access the application

Frontend: http://localhost:5173  
Backend: http://localhost:5000  

---

### 🧠 Notes

- Backend connects to Aiven PostgreSQL (cloud DB)  
- Ensure your IP is whitelisted in Aiven dashboard  
- SSL is enabled in backend configuration  

---

## 🧠 Architecture

### Data Flow

Client → POST /ingest  
       → Store in PostgreSQL  
       → Anomaly Detection (Rule A)  
       → Alert Creation  
       → WebSocket Event Emitted  
       → Frontend Updates in Real-Time  

---

## 🛠️ Tech Stack

### Backend

* Node.js + TypeScript  
* Express  
* PostgreSQL  
* Socket.io  

### Frontend

* React (Vite)  
* Axios  
* Socket.io-client  

---

## ⚙️ Features Implemented

### ✅ Ingestion Pipeline

* Accepts batch sensor readings  
* Stores data in PostgreSQL  
* Ensures durability before response  

---

### ✅ Anomaly Detection (Rule A)

* Threshold-based detection:  
  Temperature > 50 → anomaly  
* Triggers alert creation  

---

### ✅ Alert Management

* Lifecycle: open → acknowledged → resolved  
* API to update alert status  
* Audit logging for every transition  

---

### ✅ Audit Logging

* Append-only logs stored in `alert_logs`  
* Tracks: from_status, to_status, timestamp  

---

### ✅ Real-Time Updates (Core Feature)

* Implemented using WebSockets (Socket.io)  
* Events: `new-alert`, `alert-updated`  
* Frontend updates instantly without polling  

---

### ✅ Historical Query API

GET /sensors/:id/history?from=...&to=...

* Returns sensor readings + anomaly flag  
* Optimized using indexing  

---

### ✅ Auto Escalation (Basic Implementation)

* Alerts escalated if not acknowledged  
* Implemented using `setTimeout`  

---

### ✅ Database Indexing

* Index on `(sensor_id, timestamp)`  
* Index on `alerts.status`  

---

## 🧪 API Endpoints

POST /ingest  
GET /alerts  
PATCH /alerts/:id  
GET /sensors/:id/history  

---

## 🗄️ Database Design

### Tables

* readings  
* alerts  
* alert_logs  

### Design Decisions

* UUID-based identifiers  
* Separate audit logs for integrity  
* Composite indexing for performance  

---

## ⚡ Real-Time Design

* Socket.io for push updates  
* Backend emits events on alert creation/update  
* Frontend subscribes → no polling  

---

## ⚖️ Trade-offs & Simplifications

* Only Rule A implemented  
* Synchronous ingestion (no queue)  
* setTimeout for escalation  
* No zone-based access control  
* No suppression feature  

---

## ❗ Not Implemented

* Rule B (rate-of-change)  
* Rule C (pattern absence)  
* Zone-based access control  
* Suppression API  
* Async ingestion pipeline  
* Escalation logs + supervisor  
* Pagination  

---

## 🚀 Production Improvements

* Use BullMQ / Redis  
* Implement Rule B & C  
* Add escalation_log table  
* Row-level security  
* Caching layer  
* Advanced indexing  

---

## 🧠 Key Challenges

1. Real-time system without polling  
2. Alert lifecycle consistency  
3. Performance vs simplicity  

---

## ▶️ Local Development (Without Docker)

### Backend

cd backend  
npm install  
npm run dev  

### Frontend

cd frontend  
npm install  
npm run dev  

---

## 🎯 Summary

This project demonstrates:

* Real-time system design  
* Backend architecture for ingestion  
* Database modeling & indexing  
* Prioritization under constraints  

---

## 🙌 Author

Shreyash
