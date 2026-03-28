import { pool } from "../config/db";

export const scheduleEscalation = (alertId: string) => {
    setTimeout(async () => {
        try {
            const res = await pool.query(
                "SELECT status FROM alerts WHERE id = $1",
                [alertId]
            );

            if (res.rows.length === 0) return;

            const status = res.rows[0].status;

            if (status === "open") {
                await pool.query(
                    "UPDATE alerts SET severity = 'critical' WHERE id = $1",
                    [alertId]
                );

                console.log("Escalated alert:", alertId);
            }
        } catch (error) {
            console.error("Escalation error:", error);
        }
    }, 5 * 60 * 1000); // 5 minutes
};