import { Request, Response } from "express";
import { pool } from "../config/db";
import { v4 as uuidv4 } from "uuid";
import { getIO } from "../socket";
import { scheduleEscalation } from "../services/escalation.service";

export const ingestData = async (req: Request, res: Response) => {
    try {
        const readings = req.body;

        if (!Array.isArray(readings)) {
            return res.status(400).json({ message: "Invalid input" });
        }

        for (const r of readings) {
            await pool.query(
                `INSERT INTO readings 
        (id, sensor_id, timestamp, voltage, current, temperature, status_code)
        VALUES ($1,$2,$3,$4,$5,$6,$7)`,
                [
                    uuidv4(),
                    r.sensor_id,
                    r.timestamp,
                    r.voltage,
                    r.current,
                    r.temperature,
                    r.status_code,
                ]
            );

            // 🔴 anomaly check
            if (r.temperature > 50) {
                const alertId = uuidv4();

                await pool.query(
                    `INSERT INTO alerts (id, sensor_id, status, severity)
           VALUES ($1,$2,$3,$4)`,
                    [alertId, r.sensor_id, "open", "warning"]
                );

                // ✅ emit only when alert created
                getIO().emit("new-alert", {
                    sensor_id: r.sensor_id,
                    message: "New anomaly detected",
                });

                // 🔥 schedule escalation
                scheduleEscalation(alertId);
            }
        }

        return res.json({ message: "Data ingested successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
};