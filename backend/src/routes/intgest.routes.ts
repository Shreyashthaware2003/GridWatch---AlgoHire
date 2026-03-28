import express from "express";
import { ingestData } from "../controllers/ingest.controller";

const router = express.Router();

router.post("/", ingestData);

export default router;