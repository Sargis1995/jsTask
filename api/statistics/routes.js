/* eslint-disable new-cap */
import express from "express";
import statistics from "./controller";
const router = express.Router(),
    statisticsRoutes = new statistics();

router.get( "/api/statistics/students-average-grades", statisticsRoutes.studentsAverageGrades ); // checkTokenMidleware.checkToken
router.get( "/api/statistics/subjects-average-grades", statisticsRoutes.subjectsAverageGrades ); // checkTokenMidleware.checkToken
router.get( "/api/statistics/clazz-sort", statisticsRoutes.clazzSort ); // checkTokenMidleware.checkToken

export default router;
