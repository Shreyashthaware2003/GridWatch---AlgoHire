import { Request, Response } from "express";
import { pool } from "../config/db";
import { v4 as uuidv4 } from "uuid";
import { getIO } from "../socket";

// GET alerts
export const getAlerts = async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            "SELECT * FROM alerts ORDER BY created_at DESC"
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Error fetching alerts" });
    }
};

// UPDATE alert status
export const updateAlertStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const alertRes = await pool.query(
            "SELECT * FROM alerts WHERE id = $1",
            [id]
        );

        if (alertRes.rows.length === 0) {
            return res.status(404).json({ message: "Alert not found" });
        }

        const currentStatus = alertRes.rows[0].status;

        // Update alert
        await pool.query(
            "UPDATE alerts SET status = $1 WHERE id = $2",
            [status, id]
        );

        // Insert audit log
        await pool.query(
            `INSERT INTO alert_logs 
      (id, alert_id, from_status, to_status, changed_by)
      VALUES ($1,$2,$3,$4,$5)`,
            [uuidv4(), id, currentStatus, status, null]
        );

        getIO().emit("alert-updated", {
            alertId: id,
            status,
        });

        res.json({ message: "Alert updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error updating alert" });
    }
};