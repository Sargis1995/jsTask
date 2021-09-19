/* eslint-disable new-cap */
import express from "express";
import gradesRoutes from "./grades/routes";
import statisticsRoutes from "./statistics/routes";
import studentsRoutes from "./students/routes";

const router = express.Router();

router.use( gradesRoutes );
router.use( statisticsRoutes );
router.use( studentsRoutes );

export default router;
