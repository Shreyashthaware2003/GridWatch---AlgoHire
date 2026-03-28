import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import http from "http";
import { initSocket } from "./socket";
import ingestRoutes from "../src/routes/intgest.routes";
import alertRoutes from '../src/routes/alert.routes';
import sensorRoutes from "../src/routes/sensor.routes";

const app = express();


app.use(cors({
    origin: "*"
}));
app.use(express.json());

const server = http.createServer(app);

initSocket(server);

app.use("/ingest", ingestRoutes);
app.use("/alerts", alertRoutes);
app.use("/sensors", sensorRoutes);

app.get("/", (req, res) => {
    res.send("API Running...");
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});