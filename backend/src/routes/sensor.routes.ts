import express from "express";
import { getSensorHistory } from "../controllers/sensor.controller";

const router = express.Router();

router.get("/:id/history", getSensorHistory); 

export default router;