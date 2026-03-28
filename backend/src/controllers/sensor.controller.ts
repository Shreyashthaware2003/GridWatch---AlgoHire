import { Request, Response } from "express";
import { pool } from "../config/db";

export const getSensorHistory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { from, to } = req.query;

        if (!from || !to) {
            return res.status(400).json({ message: "from and to are required" });
        }

        const result = await pool.query(
            `
      SELECT 
        r.*,
        CASE 
          WHEN r.temperature > 50 THEN true
          ELSE false
        END as is_anomaly
      FROM readings r
      WHERE r.sensor_id = $1
      AND r.timestamp BETWEEN $2 AND $3
      ORDER BY r.timestamp DESC
      LIMIT 100
      `,
            [id, from, to]
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching history" });
    }
};