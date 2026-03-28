# ⚡ GridWatch — Real-Time Infrastructure Monitoring System

## 🚀 Overview

GridWatch is a real-time monitoring platform designed to ingest high-frequency sensor data, detect anomalies, generate alerts, and update a live dashboard for operators.

The system focuses on:

* Reliable ingestion of sensor data
* Real-time anomaly detection
* Alert lifecycle management
* Push-based real-time updates (no polling)

---

## 🧠 Architecture

### Data Flow

```
Client → POST /ingest
       → Store in PostgreSQL
       → Anomaly Detection (Rule A)
       → Alert Creation
       → WebSocket Event Emitted
       → Frontend Updates in Real-Time
```

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

  * Temperature > 50 → anomaly
* Triggers alert creation

---

### ✅ Alert Management

* Lifecycle:

  * `open → acknowledged → resolved`
* API to update alert status
* Audit logging for every transition

---

### ✅ Audit Logging

* Append-only logs stored in `alert_logs`
* Tracks:

  * from_status
  * to_status
  * timestamp

---

### ✅ Real-Time Updates (Core Feature)

* Implemented using WebSockets (Socket.io)
* Events:

  * `new-alert`
  * `alert-updated`
* Frontend updates instantly without polling

---

### ✅ Historical Query API

* Endpoint:

  ```
  GET /sensors/:id/history?from=...&to=...
  ```
* Returns:

  * Sensor readings
  * Derived anomaly flag per reading
* Optimized using indexing

---

### ✅ Auto Escalation (Basic Implementation)

* Alerts are escalated if not acknowledged within a time window
* Implemented using `setTimeout` for simplicity

---

### ✅ Database Indexing

* Index on `(sensor_id, timestamp)` for fast time-range queries
* Index on `alerts.status` for efficient filtering

---

## 🧪 API Endpoints

### 🔹 Ingest Data

```
POST /ingest
```

### 🔹 Get Alerts

```
GET /alerts
```

### 🔹 Update Alert

```
PATCH /alerts/:id
```

### 🔹 Sensor History

```
GET /sensors/:id/history
```

---

## 🗄️ Database Design

### Tables

* `readings` — stores sensor data
* `alerts` — stores alerts
* `alert_logs` — audit trail

### Design Decisions

* UUID-based identifiers for scalability
* Separation of alerts and logs for audit integrity
* Composite indexing for performance

---

## ⚡ Real-Time Design

* Used Socket.io for push-based updates
* Backend emits events on:

  * alert creation
  * alert updates
* Frontend subscribes and updates UI instantly
* Avoids polling → reduces latency and load

---

## ⚖️ Trade-offs & Simplifications

Due to time constraints:

* Only Rule A implemented (threshold-based)
* Ingestion pipeline is synchronous (no queue)
* Escalation implemented using `setTimeout` (not persistent)
* No zone-based access control
* No suppression feature

---

## ❗ What I Did Not Implement

* Rule B — Rate-of-change anomaly detection
* Rule C — Pattern absence detection
* Zone-based access control (data-level isolation)
* Suppression API for alerts
* Fully async ingestion pipeline
* Escalation logging and supervisor assignment
* Pagination for history API

---

## 🚀 Production Improvements

If given more time:

* Use BullMQ / Redis for async ingestion and processing
* Implement Rule B and Rule C with background workers
* Add escalation_log table and supervisor assignment
* Implement row-level security for zone isolation
* Add caching layer for high-frequency queries
* Improve query performance with advanced indexing strategies

---

## 🧠 Key Challenges

1. Designing a real-time system without polling
2. Maintaining alert lifecycle consistency with audit logs
3. Balancing performance and simplicity under time constraints

---

## ▶️ Setup Instructions

### Backend

```
cd backend
npm install
npm run dev
```

### Frontend

```
cd frontend
npm install
npm run dev
```

---

## 🎯 Summary

This project demonstrates:

* Real-time system design using WebSockets
* Backend architecture for ingestion and alerting
* Database modeling and indexing strategies
* Ability to prioritize core functionality under constraints

---

## 🙌 Author

Shreyash
