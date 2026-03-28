import express from "express";
import { getAlerts, updateAlertStatus } from "../controllers/alert.controller";

const router = express.Router();

router.get("/", getAlerts);
router.patch("/:id", updateAlertStatus);

export default router;